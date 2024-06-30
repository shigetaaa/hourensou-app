<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; //追加
use Illuminate\Database\Eloquent\Relations\HasMany; //追加

class Group extends Model
{
    use HasFactory;

    /**
     * usersテーブルとuser_groupsテーブルのリレーション
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_groups')->withTimestamps();
    }

    /**
     * usersテーブルとgroupsテーブルのリレーション
     */
    public function userGroup()
    {
        return $this->belongsToMany(User::class, 'user_group', 'user_id', 'group_id');
    }

    /**
     * このグループに所属する報告
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}
