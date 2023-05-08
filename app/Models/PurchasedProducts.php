<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedProducts extends Model
{
  use HasFactory;

  protected $table = 'purchased_products';
  protected $fillable = [
    'product',
    'user',
    'company',
    'qty',
    'size',
    'color',
    'price',
    'coupon',
    'vat',
    'delivery_value',
    'status',
    'arrive_in',
    'total_price',
  ];

  # Relations
  function product() {
    return $this->belongsTo(Product::class, 'product', 'id');
  }
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
  function coupon() {
    return $this->belongsTo(Coupon::class, 'coupon', 'id');
  }
  function company() {
    return $this->belongsTo(Company::class, 'company', 'id');
  }

}
