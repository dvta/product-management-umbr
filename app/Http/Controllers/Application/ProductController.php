<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductFilterRequest;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use App\Services\ProductService;


class ProductController extends Controller
{
    public function __construct(public ProductService $productService)
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(ProductFilterRequest $request)
    {
        return ProductResource::collection($this->productService->getProducts($request));
    }

    public function show(Product $product)
    {
        return ProductResource::make($this->productService->getProduct($product));
    }
}
