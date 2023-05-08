<?php


use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.users.'], function () {

  Route::controller(UserController::class)->group(function () {

    # Listing User
    Route::get('/', 'listUsers')->name('list');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');

    # Import users
    Route::get('import', 'importUsersView')->name('import');
    Route::post('import', 'importUsersAction');

    # New User
    Route::get('create', 'createUserView')->name('create');
    Route::post('create', 'createUserAction');

    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Delete selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # {product} Actions & Views
    Route::prefix('{user}')->group(function () {

      # Update User
      Route::get('update', 'updateUserView')->name('update');
      Route::post('update', 'updateUserAction');

      # Delete User
      Route::get('delete', 'deleteUserView')->name('delete');
      Route::post('delete', 'deleteUserAction');

      # User Data
      Route::group(['prefix' => 'view'], function () {

        # View User
        Route::get('/', 'viewUser')->name('view');

        # User Company
        Route::get('company', 'userCompany')->name('view.company');

        # User Activity
        Route::get('activities', 'userActivity')->name('view.activities');

        # User Products
        Route::get('products', 'userProducts')->name('view.products');
        Route::get('products/browsed', 'userBrowsedProducts')->name('view.products.browsed');
        Route::get('products/purchased', 'userPurchasedProducts')->name('view.products.purchased');

        # User Services
        Route::get('services', 'userServices')->name('view.services');
        Route::get('services/browsed', 'userBrowsedServices')->name('view.services.browsed');
        Route::get('services/purchased', 'userPurchasedServices')->name('view.services.purchased');

        # User Jobs
        Route::get('jobs', 'userJobs')->name('view.jobs');
        Route::get('jobs/browsed', 'userBrowsedJobs')->name('view.jobs.browsed');
        Route::get('jobs/applied', 'jobApplicants')->name('view.jobs.applied');

        # User Activity
        Route::get('activities', 'userActivities')->name('view.activity');

        # User Settings
        Route::get('settings', 'userSettingsView')->name('view.settings');
        Route::post('settings', 'userSettingsAction')->name('view.settings.main');
        Route::post('settings/user-details', 'userDetails')->name('view.settings.details');

      });

    });

  });

});
