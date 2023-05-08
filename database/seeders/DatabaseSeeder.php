<?php

namespace Database\Seeders;

// hooks Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Company;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    $this->call([
      CompaniesSeeder::class
    ]);
  }
}
