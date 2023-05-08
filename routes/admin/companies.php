<?php

use App\Http\Controllers\Admin\CompaniesController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.com.'], function () {

  Route::controller(CompaniesController::class)->group(function () {

    # Listing Companies
    Route::get('/', 'listCompanies')->name('list');
    Route::post('/', 'listCompaniesAction');

    # Trash
    Route::get('trash', 'listTrashed')->name('list.trashed');

    # New Company
    Route::get('create', 'createCompanyView')->name('create');
    Route::post('create', 'createCompanyAction');

    # Delete selected
    Route::post('delete-selected', 'deleteSelected')->name('delete.selected');

    # Delete selected
    Route::post('restore-selected', 'restoreSelected')->name('restore.selected');

    # {company_id} Actions & Views
    Route::prefix('{company}')->group(function () {

      # Update Company
      Route::get('update', 'updateCompanyView')->name('update');
      Route::post('update', 'updateCompanyAction');


      # Delete Company
      Route::get('delete', 'deleteCompanyView')->name('delete');
      Route::post('delete', 'deleteCompanyAction');

      # Message Company
      Route::get('message', 'messageCompanyView')->name('message');
      Route::post('message', 'messageCompanyAction');

      # Company Data
      Route::group(['prefix' => 'view'], function () {

        # Company View
        Route::get('/', 'viewCompanyPage')->name('view');

        # Company Products
        Route::get('products', 'companyProducts')->name('view.products');
        Route::get('products/statistics', 'companyProductsStats')->name('view.products.stats');

        # Company Services
        Route::get('services', 'companyServices')->name('view.services');
        Route::get('services/statistics', 'companyServicesStats')->name('view.services.stats');
        Route::get('services/{service}', 'viewServiceTransaction')->name('services.view');

        # Company Jobs

        Route::prefix('jobs')->group(function () {

          Route::get('/', 'companyJobs')->name('view.jobs');

          Route::get('{job}', 'viewJobPage')->name('view.job');

        });

        # Company Settings
        Route::group(['as' => 'view.settings.', 'prefix' => 'settings'], function () {

          Route::get('/', 'companySettings')->name('main');
          Route::post('/', 'companySettingsAction');

        });

        # Transactions

        Route::group(['as' => 'view.trans.', 'prefix' => 'transactions'], function () {

          Route::prefix('purchased-products')->group(function () {

            Route::get('/', 'purchasedProducts')->name('products');

            Route::prefix('{payment}')->group(function () {
              Route::get('/', 'viewProductTransaction')->name('products.view');

              Route::post('print', 'printProductTransactionAction ')->name('products.print');
            });

          });

        });

      });

    });

  });

});
