<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create user 1
        \App\Models\User::create([
            'name' => '田中花子',
            'username' => 'hanako',
            'login_id' => 'hanako',
            'password' => bcrypt('password'), // Hash the password
        ]);

        // Create user 2
        \App\Models\User::create([
            'name' => '山田太郎',
            'username' => 'taro',
            'login_id' => 'taro',
            'password' => bcrypt('password'), // Hash the password
        ]);
    }
}
