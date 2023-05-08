<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller {

  # Main View
  function settingsView() {
    return inertia('Admin/Settings/Settings', [
      'app' => App::app()
    ]);
  }

  # Change App Name
  function appName(Request $request) {
    App::updateApp([
      'app' => $request->input('appName')
    ]);
    message('Application name has been updated!');
    return to_route('admin.settings.main');
  }

  # Change App Logo
  function appLogo(Request $request) {

    $request->validate([
      'logo' => 'required',
      'logo.*' => 'required|mimes:svg,png,jpg',
    ]);

    if ($request->hasFile('logo')) {
      $file = $request->file('logo');
      $fileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(LOGOS_TARGET, $fileName);

      App::updateApp([
        'app_logo' => LOGOS_TARGET . $fileName
      ]);

      message('Application Logo has been updated!');
      return to_route('admin.settings.main');
    }

    message('Please select application logo!', 'error');
  }

  # Contact details
  function contactDetails(Request $request) {
    App::updateApp([
      'app_phone' => $request->input('phone'),
      'app_email' => $request->input('email')
    ]);
    message('Application Contact details has been updated!');
    return to_route('admin.settings.main');
  }

  # App Settings
  function changeAppSettings(Request $request) {
    App::updateApp([
      'main_mode' => $request->input('main'),
      'close_app' => $request->input('close'),
    ]);
    message('Application settings has been updated!');
    return to_route('admin.settings.main');
  }

  ########## API ##########

  # API View
  function apiHandle() {
    return inertia('Admin/Settings/API', [
      'app' => App::app()
    ]);
  }

  # API Code
  function changeApiCode(Request $request) {
    $passwordStatus = App::checkAppPassword($request->input('password'));

    if ($passwordStatus) {

      $validator = Validator::make([
        'code' => $request->input('code')
      ],
      [
        'code' => 'required|alpha_num|min:3|max:25'
      ]);

      if ($request->input('code') != '' && $validator->fails()) {
        message('Please check your new API Code. It could be empty or its length must be from [3-8] max.', 'error');
        return to_route('admin.settings.api.main');
      }

      if ($validator->validated()) {
        App::updateApp([
          'api_url_code' => trim($request->input('code'))
        ]);
        message('Your API Code has been updated successfully!');
        return to_route('admin.settings.api.main');
      }

    } else {
      message('Password isnot true try again!', 'error');
      return to_route('admin.settings.api.main');
    }

  }

  # API Settings
  function changeApiSettings(Request $request) {
    App::updateApp([
      'allow_api' => $request->input('allow'),
      'api_timestamps' => $request->input('timestamps'),
      'api_images' => $request->input('images'),
    ]);
    message('API settings has been updated!');
    return to_route('admin.settings.api.main');
  }

  ########## Passwords ##########
  function appPasswords() {
    return inertia('Admin/Settings/Passwords', [
      'app' => App::app()
    ]);
  }

  # App Password
  function changeAppPassword(Request $request) {

    $request->validate([
      'old' => 'required',
      'new' => 'required|min:8'
    ]);

    if (App::checkAppPassword($request->input('old'))) {
      App::updateApp([
        'app_password' => Hash::make($request->input('new'))
      ]);
      message('Password has been changed successfully!');
      return redirect()->refresh();
    }

    message('Old password does not match the current app password!', 'error');
    return to_route('admin.settings.passwords');
  }

  # Default password for users
  function changeDefaultUserPass(Request $request) {

    $request->validate([
      'password' => 'required',
    ]);

    App::updateApp([
      'default_users_password' => Hash::make($request->input('password'))
    ]);

    message('Default users password has been changed successfully!');

    return redirect()->route('admin.settings.passwords');
  }

  ########## Admin ##########

  # Main View
  function adminHandler() {
    return inertia('Admin/Settings/Admin', [
      'app' => App::app(),
      'admins' => Admin::all()
    ]);
  }

  # Change admin url of dashboard
  function changeAdminCode(Request $request) {
    $passwordStatus = App::checkAppPassword($request->input('password'));

    if ($passwordStatus) {

      $validator = Validator::make([
        'code' => $request->input('code')
      ],
        [
          'code' => 'required|alpha_num|min:3|max:25'
        ]);

      if ($request->input('code') != '' && $validator->fails()) {
        message('Please check your new API Code. It could be empty or its length must be from [3-8] max.', 'error');
        return to_route('admin.settings.api.main');
      }

      if ($validator->validated()) {
        App::updateApp([
          'admin_url_code' => trim($request->input('code'))
        ]);
        message('Your Dashboard Code has been updated successfully!');
        return to_route('admin.settings.admin');
      }

    } else {
      message('Password is not true try again!', 'error');
      return to_route('admin.settings.admin');
    }
  }
}
