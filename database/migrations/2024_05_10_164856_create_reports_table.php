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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('group_id');
            $table->date('date');
            $table->string('title', 100);
            $table->text('what')->nullable();
            $table->string('who', 100)->nullable();
            $table->string('when', 100)->nullable();
            $table->string('where', 100)->nullable();
            $table->text('memo')->nullable();
            $table->tinyInteger('reply_type')->nullable();
            $table->text('reply_memo')->nullable();
            $table->date('reply_limit')->nullable();
            $table->boolean('is_report_published')->default(false);
            $table->text('reply_content')->nullable();
            $table->boolean('is_reply_published')->default(false);

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('group_id')->references('id')->on('groups');

            $table->index(['user_id', 'group_id']); // 複合インデックス設定

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
