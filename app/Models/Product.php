<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'products';
  protected $fillable = ['name', 'slug', 'description', 'user', 'image', 'category', 'sub_category', 'color', 'size', 'qty', 'brand', 'price', 'offer', 'vat', 'delivery_value', 'type'];

  # Relations
  function category() {
    return $this->belongsTo(Category::class, 'category', 'id');
  }
  function sub_category() {
    return $this->belongsTo(SubCategory::class, 'sub_category', 'id');
  }
  function images() {
    return $this->hasMany(ProductImages::class, 'product', 'id');
  }
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}
