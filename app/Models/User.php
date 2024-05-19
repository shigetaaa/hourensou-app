<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use illuminate\Database\Eloquent\Model; //追加
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'login_id',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * このユーザーが複数の報告を投稿できる
     */
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }


    /**
     * このユーザーが所属するグループを取得する
     */

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'user_groups')->withTimestamps();
    }

    /**
     * このユーザーが既読した状況を管理
     */
    public function read_report(): BelongsToMany
    {
        return $this->belongsToMany(Report::class, 'read_statuses')->withPivot('is_read')->withTimestamps();
    }
}
