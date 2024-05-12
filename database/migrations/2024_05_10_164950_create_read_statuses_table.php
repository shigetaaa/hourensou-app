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
        Schema::create('read_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reports_id');
            $table->unsignedBigInteger('user_id');
            $table->boolean('is_read')->default(false);

            $table->foreign('reports_id')->references('id')->on('reports');
            $table->foreign('user_id')->references('id')->on('users');

            $table->index(['reports_id', 'user_id']); // 複合インデックス設定

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('read_statuses');
    }
};
