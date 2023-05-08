<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CompanyFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition() {
    return [
      'name' => fake()->name(),
      'title' => fake()->jobTitle(),
      'about' => fake()->realText(),
      'type' => fake()->numberBetween(0, 2),
      'phone' => fake()->numberBetween(1000, 2000),
      'website' => fake()->url(),
      'facebook' => fake()->url(),
      'logo' => fake()->image(),
      'email' => fake()->email()
    ];
  }
}
