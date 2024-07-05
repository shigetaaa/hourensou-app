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

// ルートディレクトリ報告一覧表示
Route::get('/', [ReportController::class, 'showGroupReports'])->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ユーザーごとの報告一覧表示
Route::get('/reports/{username}', [ReportController::class, 'showUsersReports'])->name('users.reports');

// 個別報告表示
Route::get('/reports/{username}/{group_slug}/{id}', [ReportController::class, 'showReport'])
    ->name('report.detail');

//報告の作成、編集、削除
Route::get('/reports/{username}/create', [ReportController::class, 'createReport'])->name('reports.create');
Route::post('/reports/{username}/{group_slug}', [ReportController::class, 'storeReport'])->name('reports.store');
Route::get('/reports/{username}/{group_slug}/{id}/edit', [ReportController::class, 'edit'])->name('reports.edit');
Route::put('/reports/{username}/{group_slug}/{id}', [ReportController::class, 'update'])->name('reports.update');


require __DIR__ . '/auth.php';
