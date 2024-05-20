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
        $user = auth()->user(); // 現在のログインユーザーを取得

        $groupReports = [];

        foreach ($user->groups as $group) {
            $groupReports[$group->group_name] = $group->reports()->orderBy('date', 'desc')->get();
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
