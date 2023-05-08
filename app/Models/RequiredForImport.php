<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredForImport extends Model
{
  use HasFactory;
  protected $table = 'required_for_importing';

  public static function getColumns($table) {
    return self::where('table', $table)->get()->toArray();
  }
  public static function tables() {
    return ['categories', 'sub_categories','products','services','jobs','companies','users'];
  }

}
