<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
  use HasFactory;
  protected $fillable = ['name', 'category', 'search_keywords'];
  protected $table = 'sub_categories';

  # Relations
  function category() {
    return $this->belongsTo(Category::class, 'category', 'id');
  }
}
