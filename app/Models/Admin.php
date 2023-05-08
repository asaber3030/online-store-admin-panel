<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Foundation\Auth\User as Authenticable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes, HasPermissions, HasRoles;

  protected $table = 'admins';
  protected $fillable = ['password', 'email', 'name', 'username', 'phone', 'verified'];

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
  public function activities(): HasMany {
    return $this->hasMany(AdminActivity::class, 'admin', 'id');
  }

  # Helper Functions
  public static function saveActivity($title, $icon, $url) {
    return AdminActivity::create([
      'admin' => Auth::guard('admin')->user()->getAuthIdentifier(),
      'title' => $title,
      'url' => $url,
      'icon'=> $icon
    ]);
  }

}
