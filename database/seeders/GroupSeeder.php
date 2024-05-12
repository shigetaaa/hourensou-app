<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create group 1
        \App\Models\Group::create([
            'group_name' => '福岡',
            'leader_user_id' => 1,
        ]);
        // Create group 2
        \App\Models\Group::create([
            'group_name' => '佐賀',
            'leader_user_id' => 1,
        ]);
        // Create group 3
        \App\Models\Group::create([
            'group_name' => '大分',
            'leader_user_id' => 2,
        ]);
        // Create group 4
        \App\Models\Group::create([
            'group_name' => '東京',
            'leader_user_id' => 2,
        ]);
    }
}
