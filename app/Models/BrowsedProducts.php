<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrowsedProducts extends Model {

  use HasFactory;

  protected $table = 'browsed_products';
  protected $fillable = ['product', 'user'];

  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }

  function product() {
    return $this->belongsTo(Product::class, 'product', 'id');
  }

}
