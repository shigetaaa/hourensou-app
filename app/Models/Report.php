<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; //追加
use Illuminate\Database\Eloquent\Relations\BelongsToMany; //追加

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'group_id',
        'date',
        'title',
        'what',
        'who',
        'when',
        'memo',
        'reply_type',
        'reply_memo',
        'reply_limit',
        'is_report_published',
        'reply_content',
        'is_reply_published',
    ];

    /**
     * この報告を投稿したユーザー
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * この報告に対するユーザーの既読状況を管理
     */
    public function read_user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'read_statuses')->withPivot('is_read')->withTimestamps();
    }
}
