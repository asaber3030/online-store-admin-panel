<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplicants extends Model
{
  use HasFactory;

  protected $table = 'job_applicants';

  # Relations
  function job() {
    return $this->belongsTo(Jobs::class, 'job', 'id');
  }
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}
