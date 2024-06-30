<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->string('random_id', 14)->after('id');
        });

        // Set a unique random_id for each report
        DB::table('reports')->get()->each(function ($report) {
            DB::table('reports')
                ->where('id', $report->id)
                ->update(['random_id' => Str::random(14)]);
        });

        Schema::table('reports', function (Blueprint $table) {
            $table->unique('random_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn('random_id');
        });
    }
};
