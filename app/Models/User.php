<?php

namespace App\Models;

// hooks Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

  use SoftDeletes;

  protected $fillable = [
    'name',
    'username',
    'email',
    'password',
    'picture',
    'national_id',
    'location',
    'city',
    'address',
    'phone',
    'ip',
    'id_pic1',
    'id_pic2',
    'verified',
    'can_create_company',
    'can_publish',
    'save_browsed_items',
    'save_his_activity'
  ];

  use HasApiTokens, HasFactory, Notifiable;

  protected $hidden = [
    'password',
    'remember_token',
  ];
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  # Attributes
  protected function username(): Attribute {
    return Attribute::make(
      get: fn($value) => '@' . strtolower($value),
      set: fn($value) => strtolower(Str::slug($value, '_'))
    );
  }
  protected function name(): Attribute {
    return Attribute::make(
      get: fn($value) => Str::title($value),
      set: fn($value) => Str::title($value),
    );
  }

  # Relations
  function company(): HasOne {
    return $this->hasOne(Company::class, 'user', 'id');
  }
  function products(): HasMany {
    return $this->hasMany(Product::class, 'user', 'id');
  }
  function services(): HasMany {
    return $this->hasMany(Service::class, 'user', 'id');
  }
  function jobs(): HasMany {
    return $this->hasMany(Jobs::class, 'user', 'id');
  }
  function purchased_products(): HasMany {
    return $this->hasMany(PurchasedProducts::class, 'user', 'id');
  }
  function browsed_products(): HasMany {
    return $this->hasMany(BrowsedProducts::class, 'user', 'id');
  }
  function browsed_services(): HasMany {
    return $this->hasMany(BrowsedServices::class, 'user', 'id');
  }
  function browsed_jobs(): HasMany {
    return $this->hasMany(BrowsedJobs::class, 'user', 'id');
  }
  function job_applicants() {
    return $this->hasMany(JobApplicants::class, 'user', 'id');
  }
  function activities(): HasMany {
    return $this->hasMany(UserActivity::class, 'user', 'id');
  }
  function purchased_services(): HasMany {
    return $this->hasMany(PurchasedServices::class, 'user', 'id');
  }

}
