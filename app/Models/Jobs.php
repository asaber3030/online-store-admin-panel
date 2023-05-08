<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jobs extends Model {

  use HasFactory, SoftDeletes;

  protected $table = 'jobs';
  protected $fillable = [
    'user', 'category', 'sub_category', 'title', 'description', 'salary', 'location', 'contract_type', 'publisher'
  ];

  # Relations
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
  function category() {
    return $this->belongsTo(Category::class, 'category', 'id');
  }
  function sub_category() {
    return $this->belongsTo(SubCategory::class, 'sub_category', 'id');
  }
  function applicants() {
    return $this->hasMany(JobApplicants::class, 'job', 'id');
  }

}
