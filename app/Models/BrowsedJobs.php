<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrowsedJobs extends Model
{
  use HasFactory;
  protected $table = 'browsed_jobs';
  protected $fillable = ['job', 'user'];

  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }

  function job() {
    return $this->belongsTo(Jobs::class, 'job', 'id');
  }
}
