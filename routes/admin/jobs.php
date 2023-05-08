<?php

use App\Http\Controllers\Admin\JobController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.jobs.'], function () {

  Route::controller(JobController::class)->group(function () {

    # Listing Job
    Route::get('/', 'listJobs')->name('list');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');

    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Delete selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # Import jobs
    Route::get('import', 'importJobsView')->name('import');

    # New Job
    Route::get('create', 'createJobView')->name('create');
    Route::post('create', 'createJobAction');

    # {job} Actions & Views
    Route::prefix('{job}')->group(function () {

      # Update Job
      Route::get('update', 'updateJobView')->name('update');
      Route::post('update', 'updateJobAction');

      # Delete Job
      Route::get('delete', 'deleteJobView')->name('delete');
      Route::post('delete', 'deleteJobAction');

      # Job Data
      Route::group(['prefix' => 'view'], function () {

        # View Job
        Route::get('/', 'viewJob')->name('view');

      });

    });

  });

});
