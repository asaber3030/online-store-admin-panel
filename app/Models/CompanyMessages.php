<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyMessages extends Model
{
  use HasFactory;
  protected $table = 'company_messages';
  protected $fillable = ['company', 'admin', 'content'];

  # Relations
  function company() {
    return $this->belongsTo(Company::class, 'company', 'id');
  }
  function admin() {
    return $this->belongsTo(Admin::class, 'admin', 'id');
  }
}
