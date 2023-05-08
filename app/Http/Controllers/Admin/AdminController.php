<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminLoginRequest;
use App\Http\Requests\Admin\CreateAdminRequest;
use App\Http\Requests\Users\CreateUserRequest;
use App\Models\Admin;
use App\Models\AdminActivity;
use App\Models\App;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminController extends Controller {

  # Dashboard
  function dashboardView() {
    return inertia('Admin/Dashboard/Dashboard');
  }

  # Login
  function loginView() {
    if (Auth::guard('admin')->check()) {
      return to_route('admin.dashboard');
    }
    return inertia('Admin/Login/Login');
  }
  function loginAction(Request $request) {

    $request->validate([
      'email' => 'required',
      'password' => 'required'
    ]);

    $authorized = Auth::guard('admin')->attempt([
      'email' => $request->input('email'),
      'password' => $request->input('password'),
    ], true);

    message('Admin authorized successfully!');

    return redirect()->intended(route('admin.dashboard'));

  }

  # Check for app password
  function appPasswordRequired(Request $request) {
    return App::checkAppPassword($request->input('password'));
  }

  #### Control Admins ####

  function listAdmins() {
    return inertia('Admin/Admins/List/ListAdmins')->with([
      'admins' => Admin::where('id', '!=', \auth()->guard('admin')->id())->orderBy('id', 'desc')->get()
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Admins/Trash/TrashedAdmins', [
      'admins' => Admin::onlyTrashed()->orderBy('id', 'desc')->get(),
    ]);
  }

  # Create User
  function createAdminView() {
    return inertia('Admin/Admins/Create/CreateAdmin');
  }
  function createAdminAction(CreateAdminRequest $request) {

    $request->validated();
    $picture = $request->file('picture');
    $pictureName = generateFileName() . $picture->getClientOriginalExtension();
    $picture->move(ADMIN_IMAGES_TARGET, $pictureName);

    Admin::create([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'picture' => ADMIN_IMAGES_TARGET . $pictureName,
      'phone' => '115454531',
      'verified' => $request->input('verified'),
      'password' => $request->input('use_default_password') ? App::getDefaultUsersPassword() : Hash::make($request->input('password'))
    ]);
    message('Admin: @' . $request->input('username') . ' has been created!');
    activity('New admin added: @' . $request->input('username'), 'plus', $request->url());
    return to_route('admin.admins.list');
  }

  # Update Admin
  function updateAdminView(Admin $admin) {
    return inertia('Admin/Admins/Update/UpdateAdmin', [
      'admin' => $admin
    ]);
  }
  function updateAdminAction(Request $request, Admin $admin) {
    $request->validate([
      'name' => 'required|min:3|max:255',
      'username' => 'required|min:3|max:255|alpha_num|unique:users,id,' . $admin->id . ',id',
      'email' => 'required|email|unique:users,id,' . $admin->id . ',id',
      'phone' => 'required|regex:' . PHONE_REGEX . '|unique:users,id,' . $admin->id . ',id',
      'verified' => 'required|in:0,1',
    ]);
    Admin::where('id', $admin->id)->update([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'phone' => $request->input('phone'),
      'verified' => $request->input('verified'),
    ]);
    message('Admin: ' . $admin->username . ' has been updated!');
    activity('Admin with ID: #' . $admin->id . ' - ' . $admin->username . ' has been updated successfully!', 'edit', $request->url());
    return to_route('admin.admins.list');
  }

  # Delete Admin
  function deleteAdminView(Admin $admin) {
    return inertia('Admin/Admins/Delete/DeleteAdmin', [
      'admin' => $admin,
    ]);
  }
  function deleteAdminAction(Request $request, Admin $admin) {
    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $admin->delete();
          message('Admin ' . $admin->username . ' has been temporary deleted', 'warning');
          activity('Admin ' . $admin->username . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.admins.list');
        } elseif ($request->deleteType == 'force') {
          $admin->forceDelete();
          message('Admin ' . $admin->username . ' has been deleted forever!', 'error');
          activity('Admin ' . $admin->username . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.admins.list');
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
      $find = Admin::find($id);
      if ($find) {
        Admin::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Admin does not exist', 'warning');
      }
    }
    return to_route('admin.admins.trash');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Admin::withTrashed()->find($id);
      if ($find) {
        Admin::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('Admin does not exist', 'warning');
      }
    }
    return to_route('admin.admins.trash');
  }

  # View Admin
  function viewAdmin(Admin $admin) {
    return inertia('Admin/Admins/View/ViewAdmin', [
      'user' => Admin::with('company')->find($admin->id)
    ]);
  }

  # Activities
  function adminActivity(Admin $admin) {
    return inertia('Admin/Admins/View/AdminActivity', [
      'admin' => Admin::find($admin->id),
      'activities' => AdminActivity::where('admin', $admin->id)->orderBy('id', 'desc')->paginate(10)
    ]);
  }


}
