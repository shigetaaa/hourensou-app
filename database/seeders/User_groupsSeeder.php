<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User_groupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 所属するグループを追加
        \App\Models\User_group::create([
            'user_id' => 1,
            'group_id' => 1,
        ]);
        \App\Models\User_group::create([
            'user_id' => 1,
            'group_id' => 2,
        ]);
        \App\Models\User_group::create([
            'user_id' => 1,
            'group_id' => 3,
        ]);
        \App\Models\User_group::create([
            'user_id' => 1,
            'group_id' => 4,
        ]);
        // 二人目を追加していく
        \App\Models\User_group::create([
            'user_id' => 2,
            'group_id' => 1,
        ]);
        \App\Models\User_group::create([
            'user_id' => 2,
            'group_id' => 2,
        ]);
        \App\Models\User_group::create([
            'user_id' => 2,
            'group_id' => 3,
        ]);
        \App\Models\User_group::create([
            'user_id' => 2,
            'group_id' => 4,
        ]);
    }
}
