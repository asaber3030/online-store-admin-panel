<?php

use App\Http\Controllers\Admin\ImportController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.import.'], function () {

  Route::controller(ImportController::class)->group(function () {

    Route::get('/', 'importMainPage')->name('main');

    Route::group(['as' => 'companies.', 'prefix' => 'companies'], function () {

      Route::get('/', 'importCompanies')->name('main');
      Route::post('/', 'importCompaniesAction');

    });

  });


});

