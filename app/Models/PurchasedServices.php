<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasedServices extends Model
{
  use HasFactory;

  protected $table = 'purchased_services';
  protected $fillable = [
    'service',
    'user',
    'salary',
    'rate',
    'time',
    'notes',
  ];

  # Relations
  function service() {
    return $this->belongsTo(Service::class, 'service', 'id');
  }
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}
