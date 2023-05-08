<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrowsedServices extends Model
{
  use HasFactory;
  protected $table = 'browsed_services';
  protected $fillable = ['service', 'user'];

  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }

  function service() {
    return $this->belongsTo(Service::class, 'service', 'id');
  }
}
