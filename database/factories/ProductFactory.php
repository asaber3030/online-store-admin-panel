<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'name' => fake()->realText(),
      'description' => fake()->realText(),
      'user' => 1,
      'category' => 1,
      'sub_category' => 4,
      'color' => fake()->colorName(),
      'size' => fake()->randomElement(['XL', 'LG', 'XXL', 'XS', 'S', 'XXXL']),
      'qty' => fake()->numberBetween(10, 30),
      'brand' => fake()->name(),
      'slug' => fake()->slug(20),
      'price' => fake()->numberBetween(100, 1000),
      'offer' => fake()->numberBetween(1, 100),
      'vat' => fake()->numberBetween(10, 20),
      'delivery_value' => fake()->numberBetween(100, 200),
      'type' => fake()->numberBetween(0,1)
    ];
  }
}
