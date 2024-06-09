<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\TrustProxies; // 追加


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class, TrustProxies::class, // 追加

        ]);

        //AWSでCSSやJSが読み込めないエラー解消：AWS向け：公式記載あり：すべてのプロキシを信頼する設定
        $middleware->trustProxies(at: '*'); // 追加
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
