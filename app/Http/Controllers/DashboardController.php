<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Group;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $authUserReports = [];
        $userGroups = $user->groups;

        foreach ($userGroups as $group) {
            $page = request()->input("page_{$group->id}", 1);

            $reports = $group->reports()
                ->where('user_id', $user->id)
                ->orderBy('date', 'desc')
                ->paginate(5, ['*'], "page_{$group->id}", $page)
                ->withQueryString()
                ->through(function ($report) {
                    return [
                        'id' => $report->id,
                        // 'random_id' => $report->random_id,
                        'date' => $report->created_at->format('Y-m-d'),
                        'title' => $report->title,
                        'username' => $report->user->username,
                    ];
                });

            $authUserReports[$group->group_name] = [
                'data' => $reports->items(),
                'group_slug' => $group->group_slug,
                'links' => [
                    'prev' => $reports->previousPageUrl(),
                    'next' => $reports->nextPageUrl(),
                ],
            ];
        }

        return Inertia::render('Dashboard', ['authUserReports' => $authUserReports]);


        // // 現在のログインユーザーを取得
        // $user = auth()->user();

        // if (!$user) {
        //     return redirect()->route('login');
        // }

        // $authUserReports = [];

        // // ユーザーが所属しているグループを取得
        // $userGroups = $user->groups;

        // foreach ($userGroups as $group) {
        //     $group_name = $group->group_name;
        //     // ページ番号取得
        //     $page = request()->input("page_{$group->id}", 1);

        //     // グループごとの報告取得
        //     // $reports = $group->reports()
        //     //     ->where('user_id', $user->id)  // ユーザー自身の報告のみ取得
        //     //     ->orderBy('date', 'desc')
        //     //     // ->paginate(5, ['*'], "page_{$group->id}", $page)
        //     //     ->paginate(5)
        //     //     ->withQueryString() // これを追加
        //     //     ->through(function ($report) {
        //     //         return [
        //     //             'id' => $report->id,
        //     //             'random_id' => $report->random_id,
        //     //             'date' => $report->created_at->format('Y-m-d'),
        //     //             'title' => $report->title,
        //     //             'username' => $report->user->username,
        //     //         ];
        //     //     });

        //     $reports = $group->reports()
        //         ->where('user_id', $user->id)
        //         ->orderBy('date', 'desc')
        //         ->paginate(5)
        //         ->withQueryString() // これを追加
        //         ->through(function ($report) {
        //             return [
        //                 'id' => $report->id,
        //                 'random_id' => $report->random_id,
        //                 'date' => $report->created_at->format('Y-m-d'),
        //                 'title' => $report->title,
        //                 'username' => $report->user->username,
        //             ];
        //         });

        //     $authUserReports[$group->group_name] = [
        //         'data' => $reports->items(),
        //         'group_slug' => $group->group_slug,
        //         'links' => [
        //             'prev' => $reports->previousPageUrl(),
        //             'next' => $reports->nextPageUrl(),
        //         ],
        //     ];


        //     // $data = $reports->items();

        //     // foreach ($data as $report) {
        //     //     $report->username = $user->username;  // ユーザー名を設定
        //     // }

        //     // Inertia使用：blade専用変数が使用できないので配列を定義
        //     // $authUserReports[$group->group_name] = [
        //     //     'data' => $data,
        //     //     'group_slug' => $group->group_slug,
        //     //     'links' => [
        //     //         'prev' => $reports->previousPageUrl(),
        //     //         'next' => $reports->nextPageUrl(),
        //     //     ],
        //     // ];
        //     dd($authUserReports);
        // }

        // return Inertia::render('Dashboard', ['authUserReports' => $authUserReports]);
    }
}
