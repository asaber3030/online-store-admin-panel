<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class App extends Model {

  use HasFactory;
  protected $table = 'app';
  private static int $appID = 1;
  public $timestamps = false;

  public static function app() {
    return self::where('id', 1)->get()[0];
  }

  public static function getAppName() {
    return self::first()->app;
  }
  public static function getDefaultUsersPassword() {
    return self::first()->default_users_password;
  }
  public static function getAppPassword() {
    return self::first()->app_password;
  }
  public static function getAdminURLCode() {
    return self::first()->admin_url_code;
  }
  public static function getAPIURLCode() {
    return self::first()->api_url_code;
  }
  public static function updateApp(array $app) {
    return self::where('id', 1)->update($app);
  }
  public static function checkAppPassword($password) {
    return Hash::check($password, self::getAppPassword());
  }

}
