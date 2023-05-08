<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobsFactory extends Factory
{

  public function definition()
  {
    return [
      'user' => 1,
      'category' => 1,
      'sub_category' => 4,
      'title' => fake()->jobTitle(),
      'description' => fake()->paragraphs(50),
      'salary' => fake()->numberBetween(10000, 50000),
      'location' => fake()->address(),
      'contract_type' => fake()->randomElement([0, 1]),
      'publisher' => fake()->randomElement([0, 1])
    ];
  }
}
