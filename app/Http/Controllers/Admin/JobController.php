<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Jobs\CreateJobRequest;
use App\Http\Requests\Users\CreateUserRequest;
use App\Models\App;
use App\Models\Category;
use App\Models\Company;
use App\Models\Jobs;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Queue\Jobs\Job;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class JobController extends Controller {

  # List User
  function listJobs() {
    return inertia('Admin/Jobs/List/ListJobs', [
      'jobs' => Jobs::with('user', 'category', 'sub_category')->get()
    ]);
  }

  # List Trashed Companies
  function listTrashed() {
    return inertia('Admin/Jobs/Trash/TrashedJobs', [
      'jobs' => Jobs::onlyTrashed()->with([
        'user',
        'category', 'sub_category'])->orderBy('id', 'desc')->get(),
    ]);
  }

  # Delete All
  function deleteSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($request->input('ids') as $key => $id) {
      $find = Jobs::find($id);
      if ($find) {
        Jobs::find($id)->delete();
        message('Selected ids has been deleted temporary!', 'warning');
      } else {
        message('Job does not exist', 'warning');
      }
    }
    return to_route('admin.jobs.list');
  }

  # Restore All
  function restoreSelected(Request $request) {
    $ids = $request->input('ids');

    foreach ($ids as $key => $id) {
      $find = Jobs::withTrashed()->find($id);
      if ($find) {
        Jobs::withTrashed()->where('id', $id)->restore();
        message('Selected ids has been restored!');
      } else {
        message('Job does not exist', 'warning');
      }
    }
    return to_route('admin.jobs.list.trashed');
  }

  # Create Job
  function createJobView() {
    return inertia('Admin/Jobs/Create/CreateJob', [
      'categories' => Category::whereHas('sub_categories')->get(),
      'sub_categories' => SubCategory::all(),
      'users' => User::all(),
      'user' => $user,
      'companies' => Company::with('user')->get()
    ]);
  }
  function createJobAction(CreateJobRequest $request) {
    $request->validated();
    Jobs::create([
      'title' => $request->input('title'),
      'description' => $request->input('description'),
      'location' => $request->input('location'),
      'salary' => $request->input('salary'),
      'contract_type' => $request->input('contract_type'),
      'category' => $request->input('category'),
      'sub_category' => $request->input('sub_category'),
      'publisher' => $request->input('publisher'),
      'user' => $request->input('user'),
    ]);
    message('New Job ' . $request->input('title') . ' has been added');
    activity('New Job ' . $request->input('title') . ' has been added', 'plus', $request->url());
    return to_route('admin.jobs.list');
  }

  # Update User
  function updateJobView(Jobs $job) {
    return inertia('Admin/Jobs/Update/UpdateJob', [
      'job' => $job,
    ]);
  }
  function updateJobAction(Request $request, Jobs $job) {
    $request->validate([
      'title' => 'required|min:3|max:255',
      'description' => 'required',
      'location' => 'required',
      'salary' => 'required|integer',
      'contract_type' => 'required|in:0,1',
    ]);
    Jobs::where('id', $job->id)->update([
      'title' => $request->input('title'),
      'description' => $request->input('description'),
      'location' => $request->input('location'),
      'salary' => $request->input('salary'),
      'contract_type' => $request->input('contract_type'),
    ]);
    message('Job of ID: #' . $job->id . ' has been updated!');
    activity('Job of ID: #' . $job->id . ' has been updated!', 'edit', $request->url());
    return to_route('admin.jobs.list');
  }

  # Delete User
  function deleteJobView(Jobs $job) {
    return inertia('Admin/Jobs/Delete/DeleteJob', [
      'job' => $job,
    ]);
  }
  function deleteJobAction(Request $request, Jobs $job) {

    if (Auth::guard('admin')->check()) {

      $checkPassword = Hash::check($request->input('password'), App::getAppPassword());

      if ($checkPassword) {
        if ($request->deleteType == 'soft') {
          $job->delete();
          message('Job With ID ' . $job->id . ' has been temporary deleted', 'warning');
          activity('Job With ID ' . $job->id . ' has been temporary deleted', 'trash', $request->url());
          return to_route('admin.jobs.list');
        } elseif ($request->deleteType == 'force') {
          $job->forceDelete();
          message('Job With ID ' . $job->id . ' has been deleted forever!', 'error');
          activity('Job With ID ' . $job->id . ' has been deleted and all its data!', 'trash', $request->url());
          return to_route('admin.jobs.list');
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

  # View User
  function viewJob(Jobs $job) {
    return inertia('Admin/Jobs/View/ViewJob', [
      'job' => Jobs::with([
        'user' => fn($q) => $q->with('company'),
        'category' => fn($q) => $q->withCount('sub_categories', 'products'),
        'sub_category'
      ])->find($job->id)
    ]);
  }

  # User Company
  function userCompany(User $user) {
    return inertia('Admin/Jobs/View/ViewCompany', [
      'user' => User::with('company')->find($user->id)
    ]);
  }

}
