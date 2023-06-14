<?php

namespace App\Services;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;

class CategoryService
{
    public function __construct()
    {
        //
    }

public function getCategories()
    {
        return Category::all();
    }

    public function store(StoreCategoryRequest $request)
    {
        return Category::create($request->validated());
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return $category;
    }

}
