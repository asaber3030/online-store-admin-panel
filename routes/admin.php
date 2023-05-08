<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AdminController;

Route::group(['as' => 'admin.'], function () {

  Route::controller(AdminController::class)->group(function () {

    Route::get('login', 'loginView')->name('login');
    Route::post('login', 'loginAction')->name('login-action');

    Route::get('app-confirmation', 'appPasswordRequired')->name('check.password');

    Route::middleware('authorize.admin')->group(function () {

      Route::get('dashboard', 'dashboardView')->name('dashboard');

    });

    Route::group(['prefix' => 'admins', 'as' => 'admins.'], function () {

      Route::get('/', 'listAdmins')->name('list');

      Route::get('/trash', 'listTrashed')->name('trash');

      # New Admin
      Route::get('create', 'createAdminView')->name('create');
      Route::post('create', 'createAdminAction');

      # Delete selected
      Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

      # Delete selected
      Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

      # {product} Actions & Views
      Route::prefix('{admin}')->group(function () {

        # Update Admin
        Route::get('update', 'updateAdminView')->name('update');
        Route::post('update', 'updateAdminAction');

        # Delete Admin
        Route::get('delete', 'deleteAdminView')->name('delete');
        Route::post('delete', 'deleteAdminAction');

        # Admin Data
        Route::group(['prefix' => 'view', 'as' => 'view.'], function () {

          # View Admin
          Route::get('/', 'viewAdmin')->name('view');

          # Admin Activity
          Route::get('activities', 'adminActivity')->name('activities');

          # Admin Settings
          Route::get('settings', 'userSettings')->name('settings');
        });

      });

    });

  });

});
