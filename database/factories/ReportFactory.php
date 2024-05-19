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
            'user_id' => $this->faker->numberBetween(1, 4),
            'group_id' => $this->faker->numberBetween(1, 4),
            'date' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'title' => $this->faker->realText($maxNbChars = 30),
            'what' => $this->faker->realText($maxNbChars = 100),
            'who' => $this->faker->realText($maxNbChars = 30),
            'when' => $this->faker->realText($maxNbChars = 30),
            'where' => $this->faker->realText($maxNbChars = 30),
            'memo' => $this->faker->realText($maxNbChars = 100),
            'reply_type' => $this->faker->numberBetween(1, 3),
            'reply_memo' => $this->faker->realText($maxNbChars = 100),
            'reply_limit' => $this->faker->dateTimeBetween('now', '+1 years'),
            'reply_content' => $this->faker->realText($maxNbChars = 100),
            'is_report_published' => true,
            'reply_content' => $this->faker->realText($maxNbChars = 100),
            'is_reply_published' => true,
        ];
    }
}
