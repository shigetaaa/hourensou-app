<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReportController; //追加

// ダッシュボード：報告の管理編集など
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 追加
// only部分:使うものだけに後から調整する
Route::resource('/', ReportController::class)
    ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->middleware(['auth']);

// ルートディレクトリ記事一覧表示
Route::get('/', [ReportController::class, 'showGroupReports'])->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ユーザーごとの記事一覧表示
Route::get('/reports/{username}', [ReportController::class, 'showUsersReports'])->name('users.reports');




// 個別記事表示
Route::get('/reports/{username}/{group_slug}/{random_id}', [ReportController::class, 'showReport'])
    ->name('report.detail');


require __DIR__ . '/auth.php';
