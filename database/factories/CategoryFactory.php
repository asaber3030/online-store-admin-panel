<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'icon' => 'defaults/images/empty-cart.png',
      'name' => fake()->shuffleArray(['Mobiles', 'Headphones', 'Laptops', 'RAMS', 'Graphic Cards']),
      'search_keywords' => fake()->text(100),
    ];
  }
}
