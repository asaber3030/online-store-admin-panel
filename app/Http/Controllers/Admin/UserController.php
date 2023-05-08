<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Models\App;
use App\Models\Company;
use App\Models\CSVFile;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {

  # List User
  function listUsers() {
    return inertia('Admin/Users/List/ListUsers', [
      'users' => User::orderBy('id', 'desc')->get()
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Users/Trash/TrashedUsers', [
      'users' => User::onlyTrashed()->orderBy('id', 'desc')->get(),
    ]);
  }

  # Import Users
  function importUsersView() {
    return inertia('Admin/Users/Import/ImportUsers', [
      'csv_files' => CSVFile::all()
    ]);
  }
  function importUsersAction(Request $request) {
    $request->validate([ 'csv_file.*' => 'required|mimes:csv', 'csv_file' => 'required|mimes:csv' ]);

    $csvFile = $request->file('csv_file');
    $generateFileName = generateFileName() . $csvFile->getClientOriginalExtension();
    $csvFile->move(USERS_CSV_FILES_TARGET, $generateFileName);

    $realFile = USERS_CSV_FILES_TARGET . $generateFileName;

    if (file_exists($realFile)) {
      $csvData = csvToArray($realFile);
      $csvHeader = getCSVHeader($realFile);

      $csvErrors = [
        'username' => [],
        'email' => [],
        'phone' => [],
        'national_id' => [],
      ];

      foreach ($csvData as $user) {
        $usernameExists = User::where('username', $user['username'])->exists();
        if ($usernameExists) { $csvErrors['username'][] = $user['username']; }

        $emailExists = User::where('email', $user['email'])->exists();
        if ($emailExists) { $csvErrors['email'][] = $user['email']; }

        $phoneExists = User::where('phone', $user['phone'])->exists();
        if ($phoneExists) { $csvErrors['phone'][] = $user['phone']; }

        $nationalIDExists = User::where('national_id', $user['national_id'])->exists();
        if ($nationalIDExists) { $csvErrors['national_id'][] = $user['national_id']; }

        if (empty($csvErrors['username']) && empty($csvErrors['national_id']) && empty($csvErrors['phone']) && empty($csvErrors['email'])) {

        }

      }

      if (empty($csvErrors['username']) && empty($csvErrors['national_id']) && empty($csvErrors['phone']) && empty($csvErrors['email'])) {

        foreach ($csvData as $user) {
          User::create([
            'name' => $user['name'],
            'username' => $user['username'],
            'email' => $user['email'],
            'phone' => $user['phone'],
            'national_id' => $user['national_id'],
            'address' => $user['address'],
            'city' => $user['address'],
            'location' => $user['location'],
            'verified' => $user['verified'],
            'password' => App::getDefaultUsersPassword()
          ]);
        }

        CSVFile::createFile('Users', $realFile);
        message('CSV Users imported, Total imported users: ' . count($csvData) . ' users');
        activity('CSV Users imported, Total imported users: ' . count($csvData) . ' users', 'faFileImport', $request->url());
        return to_route('admin.users.list');
      } else {
        session()->flash('customErrors', $csvErrors);
        unlink(USERS_CSV_FILES_TARGET . $generateFileName);
      }

    }
  }

  # Create User
  function createUserView() {
    return inertia('Admin/Users/Create/CreateUser');
  }
  function createUserAction(CreateUserRequest $request) {
    $request->validated();
    $picture = $request->file('picture');
    $pictureName = generateFileName() . $picture->getClientOriginalExtension();
    $picture->move(USERS_IMAGES_TARGET, $pictureName);

    User::create([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'picture' => USERS_IMAGES_TARGET . $pictureName,
      'national_id' => $request->input('national_id'),
      'location' => $request->input('location'),
      'city' => $request->input('city'),
      'address' => $request->input('address'),
      'phone' => $request->input('phone'),
      'verified' => $request->input('verified'),
      'password' => $request->input('use_default_password') ? App::getDefaultUsersPassword() : Hash::make($request->input('password'))
    ]);
    message('User: @' . $request->input('username') . ' has been created!');
    activity('New user added: @' . $request->input('username'), 'plus', $request->url());
    return to_route('admin.users.list');
  }

  # Update User
  function updateUserView(User $user) {
    return inertia('Admin/Users/Update/UpdateUser', [
      'user' => $user
    ]);
  }
  function updateUserAction(Request $request, User $user) {
    $request->validate([
      'name' => 'required|min:3|max:255',
      'username' => 'required|min:3|max:255|alpha_num|unique:users,id,' . $user->id . ',id',
      'email' => 'required|email|unique:users,id,' . $user->id . ',id',
      'national_id' => 'required|integer|digits:14|unique:users,id,' . $user->id . ',id',
      'location' => 'required|url',
      'city' => 'required',
      'address' => 'required',
      'phone' => 'required|regex:' . PHONE_REGEX . '|unique:users,id,' . $user->id . ',id',
      'verified' => 'required|in:0,1',
    ]);
    User::where('id', $user->id)->update([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'national_id' => $request->input('national_id'),
      'location' => $request->input('location'),
      'city' => $request->input('city'),
      'address' => $request->input('address'),
      'phone' => $request->input('phone'),
      'verified' => $request->input('verified'),
    ]);
    message('User: ' . $user->username . ' has been updated!');
    activity('User with ID: #' . $user->id . ' - ' . $user->username . ' has been updated successfully!', 'edit', $request->url());
    return to_route('admin.users.list');
  }

  # Delete User
  function deleteUserView(User $user) {
    return inertia('Admin/Users/Delete/DeleteUser', [
      'user' => $user,
    ]);
  }
  function deleteUserAction(Request $request, User $user) {
    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $user->delete();
          message('User ' . $user->name . ' has been temporary deleted', 'warning');
          activity('User ' . $user->name . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.users.list');
        } elseif ($request->deleteType == 'force') {
          $user->forceDelete();
          message('User ' . $user->name . ' has been deleted forever!', 'error');
          activity('User ' . $user->name . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.users.list');
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

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = User::find($id);
      if ($find) {
        User::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('User does not exist', 'warning');
      }
    }
    return to_route('admin.users.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = User::withTrashed()->find($id);
      if ($find) {
        User::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('User does not exist', 'warning');
      }
    }
    return to_route('admin.users.list.trashed');
  }

  # View User
  function viewUser(User $user) {
    return inertia('Admin/Users/View/ViewUser', [
      'user' => User::with('company')->withCount('products', 'jobs', 'services')->find($user->id)
    ]);
  }

  # User Company
  function userCompany(User $user) {
    return inertia('Admin/Users/View/ViewCompany', [
      'user' => User::with('company')->find($user->id)
    ]);
  }

  # User products
  function userProducts(User $user) {
    return inertia('Admin/Users/View/UserProducts', [
      'user' => User::with(['products' => fn($q) => $q->with('category', 'sub_category')])->find($user->id)
    ]);
  }

  function userBrowsedProducts(User $user) {
    return inertia('Admin/Users/View/BrowsedProducts', [
      'user' => User::with(['browsed_products' => fn($q) => $q->with(['product' => fn($q) => $q->with('category', 'sub_category')])])->find($user->id)
    ]);
  }
  function userPurchasedProducts(User $user) {
    return inertia('Admin/Users/View/Processes/PurchasedProducts', [
      'user' => User::with([
        'purchased_products' => fn($q) => $q->with([
          'product' => fn($q) => $q->with('category', 'sub_category'),
          'user',
          'company',
          'coupon'
        ]),
        'company',
      ])->find($user->id)
    ]);
  }

  # User Services
  function userServices(User $user) {
    return inertia('Admin/Users/View/UserServices', [
      'user' => User::with(['services' => fn($q) => $q->with('category', 'sub_category', 'user')])->find($user->id)
    ]);
  }
  function userBrowsedServices(User $user) {
    return inertia('Admin/Users/View/BrowsedServices', [
      'user' => User::with([
        'browsed_services' => fn($q) => $q->with([ 'service' => fn($q) => $q->with('category', 'sub_category') ])
      ])->find($user->id)
    ]);
  }
  function userPurchasedServices(User $user) {
    return inertia('Admin/Users/View/Processes/PurchasedServices', [
      'user' => User::with([
        'purchased_services' => fn($q) => $q->with([
          'service' => fn($q) => $q->with('category', 'sub_category'),
          'user',
        ]),
        'company',
      ])->find($user->id)
    ]);
  }

  # User Jobs
  function userJobs(User $user) {
    return inertia('Admin/Users/View/UserJobs', [
      'user' => User::with(['jobs' => fn($q) => $q->with('category', 'sub_category', 'user')])->find($user->id)
    ]);
  }
  function userBrowsedJobs(User $user) {
    return inertia('Admin/Users/View/BrowsedJobs', [
      'user' => User::with([
        'browsed_jobs' => fn($q) => $q->with([ 'job' => fn($q) => $q->with('category', 'sub_category') ])
      ])->find($user->id)
    ]);
  }
  function jobApplicants(User $user) {
    return inertia('Admin/Users/View/Processes/AppliedJobs', [
      'user' => User::with([
        'job_applicants' => fn($q) => $q->with([ 'job' => fn($q) => $q->with('category', 'sub_category') ])
      ])->find($user->id)
    ]);
  }

  # User Activity
  function userActivities(User $user) {
    return inertia('Admin/Users/View/UserActivity', [
      'user' => User::find($user->id),
      'activities' => UserActivity::where('user', $user->id)->orderBy('id', 'desc')->paginate(10)
    ]);
  }

  # User Settings
  function userSettingsView(User $user) {
    return inertia('Admin/Users/View/UserSettings', [
      'user' => User::find($user->id),
    ]);
  }
  function userSettingsAction(Request $request, User $user) {
    $request->validate([
      'publish' => 'required',
      'company' => 'required',
      'activity' => 'required',
      'browsed' => 'required',
      'verified' => 'required',
    ]);
    User::where('id', $user->id)->update([
      'verified' => $request->input('verified'),
      'can_create_company' => $request->input('company'),
      'can_publish' => $request->input('publish'),
      'save_browsed_items' => $request->input('browsed'),
      'save_his_activity' => $request->input('activity')
    ]);
    message('User with id ' . $user->id . ' has been updated successfully!');
    return redirect()->refresh();
  }
  function userDetails(Request $request, User $user) {
    $request->validate([
      'username' => 'unqiue:users|required|alpha_num|min:3|max:50',
      'phone' => 'regex:' . PHONE_REGEX . '|required|unique:users',
      'email' => 'required|email|unique:users',
      'name' => 'required|max:255'
    ]);
  }

}
