<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model {

  use HasFactory, SoftDeletes;
  protected $table = 'companies';
  protected $fillable = ['name', 'title', 'user', 'logo', 'about', 'type', 'phone', 'email', 'website', 'facebook'];

  # Relations
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
  function admin_messages() {
    return $this->hasMany(CompanyMessages::class, 'company', 'id');
  }

}
