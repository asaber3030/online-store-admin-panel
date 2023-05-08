<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{

  public function definition()
  {
    return [
      'name' => fake()->name(),
      'email' => fake()->unique()->safeEmail(),
      'email_verified_at' => now(),
      'password' => Hash::make('123456789'),
      'remember_token' => Str::random(10),
      'username' => fake()->userName(),
      'national_id' => 11122223333444,
      'location' => fake()->country(),
      'city' => fake()->city(),
      'address' => fake()->address(),
      'phone' => 1123525123,
      'ip' => fake()->ipv4(),
      'id_pic1' => null,
      'id_pic2' => null,
    ];
  }

  public function unverified() {
    return $this->state(fn (array $attributes) => [
      'email_verified_at' => null,
    ]);
  }
}
