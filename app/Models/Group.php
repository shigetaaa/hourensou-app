<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; //追加

class Group extends Model
{
    use HasFactory;

    /**
     * このグループに所属するユーザー
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_groups')->withTimestamps();
    }
}
