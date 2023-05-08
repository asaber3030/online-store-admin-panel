<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Companies\CreateCompanyRequest;
use App\Http\Requests\Companies\UpdateCompanyRequest;
use App\Models\App;
use App\Models\Company;
use App\Models\CompanyMessages;
use App\Models\Jobs;
use App\Models\Product;
use App\Models\PurchasedProducts;
use App\Models\PurchasedServices;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Inertia\ResponseFactory;
use Barryvdh\DomPDF\Facade\Pdf;

class CompaniesController extends Controller {

  # List Companies
  function listCompanies(): Response|ResponseFactory {
    return inertia('Admin/Companies/List/ListCompanies', [
      'companies' => Company::with('user')->orderBy('id', 'desc')->get(),
      'paginatedCompanies' => Company::with('user')->orderBy('id', 'desc')->paginate(12)
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Companies/Trash/TrashedCompanies', [
      'companies' => Company::onlyTrashed()->with('user')->orderBy('id', 'desc')->get(),
    ]);
  }

  # Create Company
  function createCompanyView() {
    return inertia('Admin/Companies/Create/CreateCompany', [
      'users' => User::all(),
      'lastCreatedCompany' => Company::with('user')->orderBy('id', 'desc')->get()->first()
    ]);
  }
  function createCompanyAction(CreateCompanyRequest $request) {

    $request->validated();

    $file = $request->file('logo');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $file->move(COMPANIES_LOGOS_TARGET, $fileName);

    Company::create([
      'name' => $request->input('name'),
      'title' => $request->input('title'),
      'about' => $request->input('about'),
      'website' => $request->input('website'),
      'facebook' => $request->input('facebook'),
      'logo' => COMPANIES_LOGOS_TARGET . $fileName,
      'user' => $request->input('user'),
      'type' => $request->input('type'),
      'email' => $request->input('email'),
      'phone' => $request->input('phone'),
    ]);

    message(
      message: 'Company has been created successfully!'
    );

    activity(
      title: 'Company ' . $request->input('name') . ' has been created',
      icon: 'plus',
      url: $request->url()
    );

    return to_route('admin.com.list');

  }

  # View Company
  function viewCompanyPage(Company $company) {
    return inertia('Admin/Companies/View/ViewCompany', [
      'company' => Company::with(['user' => fn($q) => $q->with('services', 'jobs', 'products')])->find($company->id),
    ]);
  }

  # Company Products
  function companyProducts(Company $company) {
    return inertia('Admin/Companies/View/CompanyProducts', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['products' => fn($q) => $q->with('category', 'sub_category')])
      ])->find($company->id),
    ]);
  }
  function companyProductsStats(Company $company) {
    return inertia('Admin/Companies/View/Stats/ProductsStats', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['services' => fn($q) => $q->with('category', 'sub_category')])
      ])->find($company->id),
      'lastPurchasedProduct' => PurchasedProducts::where('company', $company->id)->orderBy('id', 'desc')->get()->first(),
      'totalEarnedMoney' => PurchasedProducts::where('company', $company->id)->sum('total_price'),
      'totalNoOfProducts' => Product::where('user', $company->user)->count(),
      'sumOfQty' => Product::where('user', $company->user)->sum('qty'),
      'sumOfSoldProducts' => PurchasedProducts::where('company', $company->id)->where('status', 4)->sum('qty'),
      'expectedMoneyToBeEarned' => PurchasedProducts::where('company', $company->idid)->whereIn('status', [2, 3])->sum('total_price'),
      'expectedMoneyToBeEarnedForDelivery' => PurchasedProducts::where('company', $company->id)->whereIn('status', [2, 3])->sum('delivery_value'),
      'estimatedTimeForDelivery' => PurchasedProducts::where('company', $company->id)->avg(DB::raw('TIME_TO_SEC(arrive_in)')),
      'totalEarnedMoneyInAllMonths' => PurchasedProducts::select(DB::raw('DATE_FORMAT(created_at, "%b") as name'), DB::raw('sum(total_price) as value'), DB::raw('sum(qty) as quantity'))->groupBy('name')->get()->toArray(),
      'sumHowMany' => PurchasedProducts::select('status as name', DB::raw('count(status) as value'))->groupBy('status')->get()->toArray(),
    ]);
  }

  # Company Services
  function companyServices(Company $company) {
    return inertia('Admin/Companies/View/CompanyServices', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['services' => fn($q) => $q->with('category', 'sub_category', 'user')])
      ])->find($company->id),
    ]);
  }
  function companyServicesStats(Company $company) {
    return inertia('Admin/Companies/View/Stats/ServicesStats', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['products' => fn($q) => $q->with('category', 'sub_category')])
      ])->find($company->id),
      'lastPurchasedService' => PurchasedServices::where('company', $company->id)->orderBy('id', 'desc')->get()->first(),
      'totalEarnedMoney' => PurchasedServices::where('company', $company->id)->sum('salary'),
      'totalEarnedMoneyInAllMonths' => PurchasedServices::select(DB::raw('DATE_FORMAT(created_at, "%b") as name'), DB::raw('sum(salary) as value'))->groupBy('name')->get()->toArray(),
      'avgHoursInMonth' => PurchasedServices::select(DB::raw('DATE_FORMAT(created_at, "%b") as name'), DB::raw('TIME_TO_SEC(time) as value'))->groupBy('name', 'value')->get()->toArray(),
      'avgHoursNum' => PurchasedServices::where('company', $company->id)->avg('time'),
      'totalAvgRate' => PurchasedServices::where('company', $company->id)->avg('rate'),
      'avgSalary' => PurchasedServices::where('company', $company->id)->avg('salary'),
      'totalNumOfUsedServices' => PurchasedServices::where('company', $company->id)->count(),
      'totalNumOfServices' => Service::where('user', $company->user)->count(),
    ]);
  }

  # Company Jobs
  function companyJobs(Company $company) {
    return inertia('Admin/Companies/View/CompanyJobs', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['jobs' => fn($q) => $q->with('category', 'sub_category', 'user')])
      ])->find($company->id),
    ]);
  }
  function viewJobPage(Company $company, Jobs $job) {
    return inertia('Admin/Companies/View/Transactions/ViewJob', [
      'company' => Company::with([
        'user',
      ])->find($company->id),
      'job' => Jobs::with([
        'applicants' => fn($q) => $q->with('user')->orderBy('id', 'asc'),
        'user',
        'category',
        'sub_category'
      ])->find($job->id)
    ]);
  }

  #### Transactions ###
  function purchasedProducts(Company $company) {
    return inertia('Admin/Companies/View/Transactions/Products', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['purchased_products' => fn($q) => $q->with([
          'user',
          'product',
          'coupon',
          'company'
        ])->orderBy('id', 'DESC')])
      ])->find($company->id),
    ]);
  }
  function viewProductTransaction(Company $company, PurchasedProducts $payment) {
    return inertia('Admin/Companies/View/Transactions/ViewPayment', [
      'company' => Company::with([
        'user',
      ])->find($company->id),
      'payment' => PurchasedProducts::with([
        'user',
        'company',
        'product' => fn($q) => $q->with('images', 'category', 'sub_category'),
        'coupon'
      ])->find($payment->id)
    ]);
  }

  function viewServiceTransaction(Company $company, Service $service) {
    return inertia('Admin/Companies/View/Transactions/Services', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(
          ['purchased_services' => fn($q) => $q->with(['user', 'service'])->where('service', $service->id)])
      ])->find($company->id),
      'service' => $service,
      'purchased_services' => PurchasedServices::with('user', 'service')->where('service', $service->id)->get(),
      'totalEarnedMoney' => PurchasedServices::where('service', $service->id)->sum('salary'),
      'totalTime' => PurchasedServices::where('service', $service->id)->sum(DB::raw('TIME_TO_SEC(time)')),
      'lastTimeUsed' => PurchasedServices::with('user', 'service')->where('service', $service->id)->orderBy('id', 'desc')->first(),
      'avgRate' => PurchasedServices::where('service', $service->id)->orderBy('rate')->first()->rate ?? 0,
    ]);
  }

  # Company Settings
  function companySettings(Company $company) {
    return inertia('Admin/Companies/View/Settings/CompanySettings', [
      'company' => Company::with([
        'user' => fn($q) => $q->with(['jobs', 'services', 'products'])
      ])->find($company->id),
    ]);
  }
  function companySettingsAction(Request $request, Company $company) {
    Company::where('id', $company->id)->update([
      'add_products' => $request->input('products'),
      'add_jobs' => $request->input('jobs'),
      'add_services' => $request->input('services'),
      'update_logo' => $request->input('logo'),
      'payments' => $request->input('payments'),
      'update_details' => $request->input('details'),
    ]);
    message('Settings has been saved successfully!');
  }

  # Update Company
  function updateCompanyView(Company $company) {
    return inertia('Admin/Companies/Update/UpdateCompany', [
      'users' => User::all(),
      'company' => Company::with('user')->find($company->id),
      'lastUpdateCompany' => Company::with('user')->orderBy('updated_at', 'desc')->get()->first()
    ]);
  }
  function updateCompanyAction(UpdateCompanyRequest $request, Company $company) {

    $request->validated();

    $fileName = $company->logo;

    if ($request->hasFile('logo')) {
      $file = $request->file('logo');
      $fileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(COMPANIES_LOGOS_TARGET, $fileName);
      if (file_exists(COMPANIES_LOGOS_TARGET . $company->logo)) {
        unlink(COMPANIES_LOGOS_TARGET . $company->logo);

      }
    }

    Company::where('id', $company->id)->update([
      'name' => $request->input('name'),
      'title' => $request->input('title'),
      'about' => $request->input('about'),
      'website' => $request->input('website'),
      'facebook' => $request->input('facebook'),
      'logo' => $request->hasFile('logo') ? COMPANIES_LOGOS_TARGET . $fileName : $company->logo,
      'user' => $request->input('user'),
      'type' => $request->input('type'),
      'email' => $request->input('email'),
      'phone' => $request->input('phone'),
    ]);

    message(
      message: 'Company ' . $company->name. ' has been created successfully!'
    );

    activity(
      title: 'Company ' . $request->input('name') . ' has been updated',
      icon: 'edit',
      url: $request->url()
    );

    return to_route('admin.com.list');

  }

  # Delete Company
  function deleteCompanyView(Company $company) {
    return inertia('Admin/Companies/Delete/Delete', [
      'company' => Company::with('user')->find($company->id),
    ]);
  }
  function deleteCompanyAction(Request $request, Company $company) {
    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $company->delete();
          message('Company ' . $company->name . ' has been temporary deleted', 'warning');
          activity('Company ' . $company->name . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.com.list');
        } elseif ($request->deleteType == 'force') {
          $company->forceDelete();
          message('Company ' . $company->name . ' has been deleted forever!', 'error');
          activity('Company ' . $company->name . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.com.list');

        }

      } else {
        session()->put('passwordTries', $request->input('tries'));
        session()->flash('customErrors', 'Application password is wrong! you tried ' . $request->input('tries') . ' times');
        if (session()->get('passwordTries') > 5) {
          Auth::guard('admin')->logout();
          return to_route('admin.login');
        }
      }
    }
  }

  # Message Company
  function messageCompanyView(Company $company) {
    return inertia('Admin/Companies/Message/MessageCompany', [
      'company' => Company::with([
        'user',
        'admin_messages' => fn($q) => $q->orderBy('id', 'desc')->with('admin')
      ])->withCount('admin_messages')
        ->find($company->id),
      'companies' => Company::with('user')
        ->withCount('admin_messages')
        ->where('id', '!=', $company->id)->get()
    ]);
  }
  function messageCompanyAction(Request $request, Company $company) {
    if (Auth::guard('admin')->check()) {
      $request->validate([
        'content' => 'required|min:100|max:255'
      ]);
      CompanyMessages::create([
        'admin' => admin()->getAuthIdentifier(),
        'company' => $company->id,
        'content' => $request->input('content')
      ]);
      message('Message has been sent successfully to company ' . $company->name);
      return to_route('admin.com.message', $company->id);
    }
  }

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = Company::find($id);
      if ($find) {
        Company::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Company does not exist', 'warning');
      }
    }
    return to_route('admin.com.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Company::withTrashed()->find($id);
      if ($find) {
        Company::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('Company does not exist', 'warning');
      }
    }
    return to_route('admin.com.list.trashed');
  }
}
