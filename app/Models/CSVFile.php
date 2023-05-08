<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CSVFile extends Model
{
  use HasFactory;
  public $timestamps = false;
  protected $table = 'csv_files';
  protected $fillable = ['type', 'path'];


  # Helper
  static function createFile(string $type, string $path) {
    return self::create([
      'path' => $path,
      'type' => $type
    ]);
  }

}
