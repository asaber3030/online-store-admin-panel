<?php

use App\Http\Controllers\Admin\ServiceController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.services.'], function () {

  Route::controller(ServiceController::class)->group(function () {

    # Listing Service
    Route::get('/', 'listServices')->name('list');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');
    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Delete selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # New Service
    Route::get('create', 'createServiceView')->name('create');
    Route::post('create', 'createServiceAction');

    # Import Service
    Route::get('import', 'importServicesView')->name('import');
    Route::post('import', 'importServicesAction');

    # {service} Actions & Views
    Route::prefix('{service}')->group(function () {

      # Update Service
      Route::get('update', 'updateServiceView')->name('update');
      Route::post('update', 'updateServiceAction');

      # Delete Service
      Route::get('delete', 'deleteServiceView')->name('delete');
      Route::post('delete', 'deleteServiceAction');

      # Service Data
      Route::group(['prefix' => 'view'], function () {

        # View Service
        Route::get('/', 'viewService')->name('view');

      });

    });

  });

});
