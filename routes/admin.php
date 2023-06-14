<?php


use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;



Route::apiResource('products', ProductController::class);
Route::apiResource('categories', CategoryController::class);
