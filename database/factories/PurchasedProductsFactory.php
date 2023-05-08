<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchasedProducts>
 */
class PurchasedProductsFactory extends Factory
{

  public function definition() {
    return [
      'product' => 301,
      'user' => 1,
      'coupon' => 1,
      'company' => 106,
      'qty' => fake()->numberBetween(1, 3),
      'size' => fake()->randomElement(['LG', 'XL', 'XXL', 'SM', 'MD']),
      'color' => fake()->colorName(),
      'price' => fake()->numberBetween(100, 2000),
      'total_price' => fake()->numberBetween(122, 545454),
      'vat' => fake()->numberBetween(10, 100),
      'delivery_value' => fake()->numberBetween(10, 200),
      'status' => fake()->randomElement([0, 1, 2, 3, 4]),
      'arrive_in' => fake()->dateTime(),
      'created_at' => fake()->dateTime()
    ];
  }
}
