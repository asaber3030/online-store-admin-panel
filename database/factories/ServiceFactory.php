<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory {

  public function definition() {
    return [
      'name' => fake()->jobTitle(),
      'details' => fake()->paragraph(),
      'user' => 1,
      'category' => 1,
      'sub_category' => 4,
      'salary' => fake()->numberBetween(10, 25000),
      'salary_per_hour' => fake()->numberBetween(15, 10000)
    ];
  }
}
