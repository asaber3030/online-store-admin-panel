<?php

use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'admin.settings.'], function () {

  Route::controller(SettingsController::class)->group(function () {

    Route::get('/', 'settingsView')->name('main');

    Route::post('update-app-name', 'appName')->name('app.name');
    Route::post('update-app-logo', 'appLogo')->name('app.logo');
    Route::post('update-app-contact', 'contactDetails')->name('app.contact');
    Route::post('update-app-settings', 'changeAppSettings')->name('app.settings');

    Route::group(['prefix' => 'api', 'as' => 'api.'], function () {

      Route::get('/', 'apiHandle')->name('main');
      Route::post('/', 'changeApiCode')->name('api_code');

      Route::post('/handle', 'changeApiSettings')->name('settings');

    });

    Route::get('/passwords', 'appPasswords')->name('passwords');
    Route::post('/passwords', 'changeAppPassword')->name('passwords.app.change');
    Route::post('/passwords-user-default', 'changeDefaultUserPass')->name('passwords.user.default');

    Route::get('/admin', 'adminHandler')->name('admin');
    Route::post('/admin', 'changeAdminCode')->name('admin.code');

  });

});
