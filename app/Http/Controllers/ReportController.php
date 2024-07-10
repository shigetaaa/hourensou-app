<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Report;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
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
    // public function showAllReports()
    // {
    //     $report = new Report();
    //     $allReports = $report->getAllReports();
    //     return Inertia::render('Welcome', ['reports' => $allReports]);
    // }

    /**
     * グループごとの報告を表示/ルートWelcomeページ
     */
    public function showGroupReports(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $currentGroupId = $request->input('group_id');
        $page = $request->input('page', 1);

        $groupReports = [];

        foreach ($user->groups as $group) {
            $reports = $group->reports()->with('user')->orderBy('date', 'desc');

            if ($group->id == $currentGroupId) {
                $reports = $reports->paginate(5, ['*'], 'page', $page);
            } else {
                $reports = $reports->paginate(5);
            }

            $data = $reports->items();

            foreach ($data as $report) {
                $report->username = $report->user->username;
                $report->name = $report->user->name;
            }

            $groupReports[$group->group_name] = [
                'data' => $data,
                'group_slug' => $group->group_slug,
                'group_id' => $group->id,

                'links' => [
                    'prev' => $reports->previousPageUrl(),
                    'next' => $reports->nextPageUrl(),
                ],
                'current_page' => $reports->currentPage(),
                'last_page' => $reports->lastPage(),
            ];
        }

        return Inertia::render('Welcome', ['groupReports' => $groupReports, 'currentGroupId' => $currentGroupId]);
    }

    /**
     * 各ユーザの報告を表示
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

            $data = $reports->items();

            foreach ($data as $report) {
                $report->username = $report->user->username;
                $report->name = $report->user->name;
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

    public function showReport(string $username, string $group_slug, $id)
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
            ->where('id', $id)
            ->first();

        if (!$report) {
            abort(404);
        }

        //ユーザーがレポートのグループに所属しているかを確認する
        $isUserInGroup = $user->groups->contains('id', $report->group_id);

        if (!$isUserInGroup) {
            return Inertia::render('Error', ['message' => '表示できません。報告はグループメンバー限定で公開されています。']);
        }


        // Inertia使用：blade専用変数が使用できないので配列を定義
        $reportDetail = [
            'data' => $report,
            'group_name' => $report->group->group_name,
            'name' => $report->user->name,
        ];

        // dd($reportDetail);

        return Inertia::render('ReportDetail', ['reportDetail' => $reportDetail]);
    }


    /**
     * 新規記事作成フォームの表示
     */
    public function createReport(string $username)
    {
        $user = auth()->user();

        if (!$user || $user->username !== $username) {
            return redirect()->route('login');
        }

        $userGroups = $user->groups;

        if ($userGroups->isEmpty()) {
            return Inertia::render('Error', ['message' => 'まだグループに参加していません。所属のグループリーダーに参加登録を依頼してください']);
        }

        $createReportData = [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
            ],
            'groups' => $userGroups->map(function ($group) {
                return [
                    'id' => $group->id,
                    'group_name' => $group->group_name,
                    'group_slug' => $group->group_slug,
                ];
            }),
        ];
        return Inertia::render('CreateReport', $createReportData);
    }

    /**
     * 新規報告の保存
     */

    public function storeReport(Request $request, string $username, string $group_slug)
    {
        $user = auth()->user();

        if (!$user || $user->username !== $username) {
            return redirect()->route('login');
        }

        $validatedData = $request->validate([
            'date' => 'required|date',
            'title' => 'required|max:255',
            'what' => 'required',
            'who' => 'required',
            'when' => 'required',
            'where' => 'required',
            'memo' => 'nullable',
            'reply_type' => 'required',
            'reply_memo' => 'nullable',
            'reply_limit' => 'nullable|date',
            'group_slug' => 'required|exists:groups,group_slug',
            'is_published' => 'boolean',
            'reply_content' => 'nullable',
            'is_reply_published' => 'boolean',
        ]);

        $group = Group::where('group_slug', $validatedData['group_slug'])->firstOrFail();

        $report = new Report($validatedData);
        $report->user_id = $user->id;
        $report->group_id = $group->id;
        $report->is_report_published = $validatedData['is_published'];
        $report->save();

        $message = $report->is_report_published ? '記事を公開しました。' : '記事を下書き保存しました。';

        return Inertia::render('ReportCreated', [
            'message' => $message,
            'report' => $report,
        ]);
    }



    /**
     * 報告の編集
     */
    public function editReport(string $username, string $group_slug, $id)
    {
        $user = auth()->user();

        if (!$user || $user->username !== $username) {
            return redirect()->route('login');
        }

        $report = Report::with(['group', 'user'])
            ->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })
            ->whereHas('group', function ($query) use ($group_slug) {
                $query->where('group_slug', $group_slug);
            })
            ->where('id', $id)
            ->first();

        if (!$report) {
            abort(404);
        }

        //ユーザーが作成した報告かを確認する
        $isUserReport = $user->id === $report->user_id;
        if (!$isUserReport) {
            return Inertia::render('Error', ['message' => '編集できません。報告は作成者のみ編集できます。']);
        }

        return Inertia::render('EditReport', ['report' => $report]);
    }

    /**
     * 報告の更新
     */
    public function updateReport(Request $request, string $username, string $group_slug, $id)
    {
        $user = auth()->user();

        if (!$user || $user->username !== $username) {
            return redirect()->route('login');
        }

        $report = Report::where('id', $id)
            ->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })
            ->whereHas('group', function ($query) use ($group_slug) {
                $query->where('group_slug', $group_slug);
            })
            ->firstOrFail();

        if ($user->id !== $report->user_id) {
            return Inertia::render('Error', ['message' => '更新権限がありません。']);
        }

        $validatedData = $request->validate([
            'date' => 'required|date',
            'title' => 'required|max:255',
            'what' => 'required',
            'who' => 'required',
            'when' => 'required',
            'where' => 'required',
            'memo' => 'nullable',
            'reply_type' => 'required',
            'reply_memo' => 'nullable',
            'reply_limit' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $report->update($validatedData);
        $report->is_report_published = $validatedData['is_published'];
        $report->save();

        $message = $report->is_report_published ? '報告を更新し、公開しました。' : '報告を更新し、下書き保存しました。';

        return redirect()->route('report.detail', [
            'username' => $username,
            'group_slug' => $group_slug,
            'id' => $report->id
        ])->with('message', $message);
    }


    // public function update(Request $request, Report $report)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }

    /**
     * 報告の削除
     */
    public function deleteReport(string $username, string $group_slug, $id)
    {
        $user = auth()->user();

        if (!$user || $user->username !== $username) {
            return redirect()->route('login');
        }

        $report = Report::where('id', $id)
            ->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })
            ->whereHas('group', function ($query) use ($group_slug) {
                $query->where('group_slug', $group_slug);
            })
            ->firstOrFail();

        // ユーザーが報告の所有者であることを確認
        if ($user->id !== $report->user_id) {
            return Inertia::render('Error', ['message' => '削除権限がありません。']);
        }

        $report->delete();

        return redirect()->route('dashboard')->with('message', '報告が削除されました');
    }
} // class ReportController終了
