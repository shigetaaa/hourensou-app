<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 2),
            'group_id' => $this->faker->numberBetween(1, 4),
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'is_report_published' => true,
            'is_reply_published' => true,
        ];
    }
}
