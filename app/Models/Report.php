<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; //追加

class Report extends Model
{
    use HasFactory;

    /**
     * この報告に対するユーザーの既読状況を管理
     */
    public function read_user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'read_statuses')->withPivot('is_read')->withTimestamps();
    }
}
