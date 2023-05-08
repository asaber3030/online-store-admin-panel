<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model {
  use HasFactory, SoftDeletes;

  protected $table = 'services';
  protected $fillable = ['name', 'details', 'sub_category', 'category', 'user', 'publisher', 'salary', 'salary_per_hour'];

  # Relations
  function category() {
    return $this->belongsTo(Category::class, 'category', 'id');
  }
  function sub_category() {
    return $this->belongsTo(SubCategory::class, 'sub_category', 'id');
  }
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }

}
