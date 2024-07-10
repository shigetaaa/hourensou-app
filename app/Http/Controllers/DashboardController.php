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
                        'name' => $report->user->name,
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
    }
}
