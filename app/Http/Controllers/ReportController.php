<?php

namespace App\Http\Controllers;

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

        $groupReports = [];

        foreach ($user->groups as $group) {
            // ページ番号取得
            $page = request()->input("page_{$group->id}", 1);

            // グループごとの報告取得
            $reports = $group->reports()->orderBy('date', 'desc')->paginate(5, ['*'], "page_{$group->id}", $page);

            // Inertia使用：blade専用変数が使用できないので配列を定義
            $groupReports[$group->group_name] = [
                'data' => $reports->items(),
                'links' => [
                    'prev' => $reports->previousPageUrl(),
                    'next' => $reports->nextPageUrl(),
                ],
                //meta情報が不要な場合は削除
                'meta' => [
                    'current_page' => $reports->currentPage(),
                    'from' => $reports->firstItem(),
                    'last_page' => $reports->lastPage(),
                    'path' => $reports->path(),
                    'per_page' => $reports->perPage(),
                    'to' => $reports->lastItem(),
                    'total' => $reports->total(),
                ],
            ];
        }

        // デバッグ用
        // dd($groupReports);

        return Inertia::render('Welcome', ['groupReports' => $groupReports]);
    }

    /**
     * 個別の報告を表示
     */
    public function showReport($id)
    {
        $report = Report::with('group')->findOrFail($id);

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
