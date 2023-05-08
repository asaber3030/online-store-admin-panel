<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminActivity extends Model
{
  use HasFactory;

  protected $table = 'admin_activities';
  protected $fillable = ['url', 'admin', 'title', 'icon'];
  public $timestamps = false;

  # Relations
  public function admin(): BelongsTo {
    return $this->belongsTo(Admin::class, 'admin', 'id');
  }

}
