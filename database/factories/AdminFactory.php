<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Testing\Concerns\Has;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
  public function definition()
  {
    return [
      'email' => fake()->unique()->safeEmail(),
      'name' => fake()->name(),
      'username' => fake()->userName(),
      'password' => Hash::make('123456789'),
      'phone' => 1123525123,
      'remember_token' => Hash::make(Str::title(10))
    ];
  }
}
