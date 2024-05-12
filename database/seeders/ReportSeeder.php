<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create report 1
        \App\Models\Report::create([
            'user_id' => 1,
            'group_id' => 1,
            'date' => '2021-01-01',
            'title' => '福岡の報告',
            'what' => 'スケジュール調整をしました。',
            'who' => '全員',
            'when' => '5月1日あたり',
            'where' => 'Zoom',
            'memo' => '次回のイベントのために決めました。',
            'reply_type' => 0,
            'reply_memo' => 'この日程でいいか返事がほしいです。',
            'reply_limit' => '2021-01-15',
            'reply_content' => 'LINEで返事をします。',
            'is_report_published' => true,
        ]);
    }
}
