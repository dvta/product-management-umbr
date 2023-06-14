<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()
            ->count(100)
            ->create()
            ->each(function (Product $product) {
                $product->categories()->attach(
                    Category::inRandomOrder()->limit(rand(1, 3))->pluck('id')->toArray()
                );
            });
    }
}
