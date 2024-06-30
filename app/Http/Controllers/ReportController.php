<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Report;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ReportController extends Controller
{
    /**
     * Display
     */
    public function index()
    {
        //
    }

    /**
     * すべての報告を表示
     */
    public function showAllReports()
    {
        $report = new Report();
        $allReports = $report->getAllReports();

        // デバッグ用に $allReports の内容を直接表示する
        // dd($allReports);

        return Inertia::render('Welcome', ['reports' => $allReports]);
    }

    /**
     * グループごとの報告を表示
     */

    public function showGroupReports()
    {
        // 現在のログインユーザーを取得
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $usersGroupReports = [];

        foreach ($user->groups as $group) {
            $group_slug = $group->group_slug;
            // ページ番号取得
            $page = request()->input("page_{$group->id}", 1);

            // グループごとの報告取得
            $reports = $group->reports()->orderBy('date', 'desc')->paginate(5, ['*'], "page_{$group->id}", $page);

            // $data = $reports->getCollection();
            $data = $reports->items();

            foreach ($data as $report) {
                $report->username = $report->user->username;
            }

            // Inertia使用：blade専用変数が使用できないので配列を定義
            $groupReports[$group->group_name] = [

                'data' => $data,
                'group_slug' => $group->group_slug,

                'links' => [
                    'prev' => $reports->previousPageUrl(),
                    'next' => $reports->nextPageUrl(),
                ],
            ];
        }

        return Inertia::render('Welcome', ['groupReports' => $groupReports]);
    }

    /**
     * 各ユーザーのごと報告を表示
     */

    //ルートパラメータを引数$usernameとして受け取る
    public function showUsersReports(string $username)
    {
        // 現在のログインユーザーを取得
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $usersGroupReports = [];

        foreach ($user->groups as $group) {
            $group_slug = $group->group_slug;
            // ページ番号取得
            $page = request()->input("page_{$group->id}", 1);

            // グループごとの報告取得
            $reports = $group->reports()->orderBy('date', 'desc')->paginate(5, ['*'], "page_{$group->id}", $page);

            // $data = $reports->getCollection();
            $data = $reports->items();

            foreach ($data as $report) {
                $report->username = $report->user->username;
            }

            // Inertia使用：blade専用変数が使用できないので配列を定義
            $usersGroupReports[$group->group_name] = [

                'data' => $data,
                'group_slug' => $group->group_slug,

                'links' => [
                    'prev' => $reports->previousPageUrl(),
                    'next' => $reports->nextPageUrl(),
                ],
            ];
        }

        return Inertia::render('UsersReports', ['usersGroupReports' => $usersGroupReports]);
    }



    /**
     * 個別の報告を表示
     */

    public function showReport(string $username, string $group_slug, string $random_id)
    {
        // 現在のログインユーザーを取得
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $report = Report::with(['group', 'user'])
            ->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })
            ->whereHas('group', function ($query) use ($group_slug) {
                $query->where('group_slug', $group_slug);
            })
            ->where('random_id', $random_id)
            ->first();

        if (!$report) {
            abort(404);
        }

        //ユーザーがレポートのグループに所属しているかを確認する
        $isUserInGroup = $user->groups->contains('id', $report->group_id);

        if (!$isUserInGroup) {
            return Inertia::render('Error', ['message' => '表示できません。報告はグループメンバー限定で公開されています。']);
        }

        return Inertia::render('ReportDetail', ['report' => $report]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
