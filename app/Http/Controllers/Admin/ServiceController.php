<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jobs\CreateJobRequest;
use App\Http\Requests\Services\CreateServiceRequest;
use App\Models\App;
use App\Models\Category;
use App\Models\Company;
use App\Models\CSVFile;
use App\Models\Jobs;
use App\Models\Service;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ServiceController extends Controller {

  # List Services
  function listServices() {
    return inertia('Admin/Services/List/ListServices', [
      'services' => Service::with('user', 'category', 'sub_category')->orderBy('id', 'desc')->get()
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Services/Trash/TrashedServices', [
      'services' => Service::onlyTrashed()->with('user', 'category', 'sub_category')->orderBy('id', 'desc')->get(),
    ]);
  }

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = Service::find($id);
      if ($find) {
        Service::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Service does not exist', 'warning');
      }
    }
    return to_route('admin.services.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Service::withTrashed()->find($id);
      if ($find) {
        Service::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('Service does not exist', 'warning');
      }
    }
    return to_route('admin.services.list.trashed');
  }

  # Import Services
  function importServicesView() {
    return inertia('Admin/Services/Import/ImportServices');
  }
  function importServicesAction(Request $request) {
    $request->validate([ 'csv_file.*' => 'required|mimes:csv', 'csv_file' => 'required|mimes:csv' ]);

    $csvFile = $request->file('csv_file');
    $generateFileName = generateFileName() . $csvFile->getClientOriginalExtension();
    $csvFile->move(SERVICES_CSV_FILES_TARGET, $generateFileName);

    $realFile = SERVICES_CSV_FILES_TARGET . $generateFileName;

    if (file_exists($realFile)) {
      $csvData = csvToArray($realFile);
      $csvHeader = getCSVHeader($realFile);

      if (!($csvHeader == ServicesColumnsCSV)) {
        message('Cannot upload this data please make sure that you are uploading with same given info.', 'error');
        return to_route('admin.services.import');
      }

      $csvErrors = [
        'user' => [],
        'category' => [],
        'sub_category' => [],
      ];

      foreach ($csvData as $service) {
        $userExists = User::where('id', $service['user'])->exists();
        if (!$userExists) { $csvErrors['user'][] = $service['user']; }

        $categoryExists = Category::where('id', $service['category'])->exists();
        if (!$categoryExists) { $csvErrors['category'][] = $service['category']; }

        $subCategoryExists = SubCategory::where('id', $service['sub_category'])->where('category', $service['category'])->exists();
        if ($subCategoryExists) { $csvErrors['sub_category'][] = $service['sub_category']; }

      }

      if (empty($csvErrors['username']) && empty($csvErrors['national_id']) && empty($csvErrors['phone']) && empty($csvErrors['email'])) {

        foreach ($csvData as $service) {
          Service::create([
            'name' => $service['name'],
            'user' => $service['user'],
            'category' => $service['category'],
            'sub_category' => $service['sub_category'],
            'publisher' => $service['publisher'],
            'salary' => $service['salary'],
            'salary_per_hour' => $service['salary_per_hour'],
            'details' => ''
          ]);
        }

        CSVFile::createFile('Services', $realFile);
        message('CSV Services imported, Total imported: ' . count($csvData) . ' users');
        activity('CSV Services imported, Total imported: ' . count($csvData) . ' users', 'faFileImport', $request->url());
        return to_route('admin.services.list');
      } else {
        session()->flash('customErrors', $csvErrors);
        unlink(SERVICES_CSV_FILES_TARGET . $generateFileName);
      }

    }
  }

  # Create Service
  function createServiceView() {
    return inertia('Admin/Services/Create/CreateService', [
      'categories' => Category::whereHas('sub_categories')->where('type', 2)->get(),
      'sub_categories' => SubCategory::all(),
      'users' => User::all(),
      'companies' => Company::with('user')->get()
    ]);
  }
  function createServiceAction(CreateServiceRequest $request) {
    $request->validated();
    Service::create([
      'name' => $request->input('name'),
      'details' => $request->input('details'),
      'salary' => $request->input('salary'),
      'salary_per_hour' => $request->input('salary_per_hour'),
      'user' => $request->input('user'),
      'category' => $request->input('category'),
      'sub_category' => $request->input('sub_category'),
      'publisher' => $request->input('publisher'),
    ]);
    message('New Service ' . $request->input('title') . ' has been added');
    activity('New Service ' . $request->input('title') . ' has been added', 'plus', $request->url());
    return to_route('admin.services.list');
  }

  # Update User
  function updateServiceView(Service $service) {
    return inertia('Admin/Services/Update/UpdateService', [
      'service' => Service::with([
        'category',
        'sub_category',
        'user' => fn($q) => $q->with('company')
      ])->find($service->id),
    ]);
  }
  function updateServiceAction(Request $request, Service $service) {
    $request->validate([
      'name' => 'required|min:3|max:255',
      'details' => 'required',
      'salary_per_hour' => 'required',
      'salary' => 'required|integer',
    ]);
    Service::where('id', $service->id)->update([
      'name' => $request->input('name'),
      'details' => $request->input('details'),
      'salary' => $request->input('salary'),
      'salary_per_hour' => $request->input('salary'),
    ]);
    message('Service of ID: #' . $service->id . ' has been updated!');
    activity('Service of ID: #' . $service->id . ' has been updated!', 'edit', $request->url());
    return to_route('admin.services.list');
  }

  # Delete User
  function deleteServiceView(Service $service) {
    return inertia('Admin/Services/Delete/DeleteService', [
      'service' => $service,
    ]);
  }
  function deleteServiceAction(Request $request, Service $service) {

    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $service->delete();
          message('Service With ID ' . $service->id . ' has been temporary deleted', 'warning');
          activity('Service With ID ' . $service->id . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.services.list');
        } elseif ($request->deleteType == 'force') {
          $service->forceDelete();
          message('Service With ID ' . $service->id . ' has been deleted forever!', 'error');
          activity('Service With ID ' . $service->id . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.services.list');
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

  # View Service
  function viewService(Service $service) {
    return inertia('Admin/Services/View/ViewService', [
      'service' => Service::with([
        'user' => fn($q) => $q->with('company')->withCount('products', 'services', 'jobs'),
        'category' => fn($q) => $q->withCount('sub_categories', 'products'),
        'sub_category'
      ])->find($service->id)
    ]);
  }

}
