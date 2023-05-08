<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
  use HasFactory;

  protected $table = 'user_activities';
  protected $fillable = ['user', 'title', 'url'];

  public static function saveActivity($user, $icon, $title, $url) {
    return self::create([
      'user' => $user,
      'icon' => $icon,
      'title' => $title,
      'url' => $url
    ]);
  }

  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}
