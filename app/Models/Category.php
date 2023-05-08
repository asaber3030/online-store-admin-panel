<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
  use HasFactory, SoftDeletes;
  protected $fillable = ['name', 'icon', 'search_keywords', 'type'];
  protected $table = 'categories';

  # Relations
  function sub_categories() {
    return $this->hasMany(SubCategory::class, 'category', 'id');
  }
  function products() {
    return $this->hasMany(Product::class, 'category', 'id');
  }
}
