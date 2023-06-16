<?php

namespace App\Services;

use App\Http\Requests\Product\ProductFilterRequest;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;


class ProductService
{
    public function __construct(public ImageService $imageService)
    {
        //
    }

    public function getProducts(ProductFilterRequest $request)
    {
        return Product::when($request->name, function ($query){
            $query->where('name', 'like', '%' . request()->name . '%');
        })
            ->when($request->categories, function ($query) use ($request){
                $query->whereHas('categories', function ($query) use ($request){
                    $query->whereIn('category_id', $request->categories);
                });
            })
            ->when($request->price, function ($query){
                $query->whereBetween('price', [request()->price['min'], request()->price['max']]);
            })->with(['categories', 'images'])
            ->orderBy('created_at', 'desc')
            ->paginate(1000)
            ->appends(request()->query());
    }

    public function getProduct(Product $product)
    {
        return $product;
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());

        if ($request->has('images')){
            foreach ($request->images as $image) {
                $data = [
                    'path' => $this->imageService->upload($image),
                ];

                $product->images()->create($data);
            }
        }

        $product->categories()->attach($request->categories);


        return $product;
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());

        $this->syncImages($product, $request->images ?? []);

        $product->categories()->sync($request->categories);

        return $product;
    }

    public function syncImages(Product $product, array $images)
    {
        $imageIds = array_column($images, 'id');

        $productImages = $product->images()->whereNotIn('id', $imageIds)->get();

        foreach ($productImages as $image) {
            $this->imageService->delete($image->path);
            $image->delete();
        }

        foreach ($images as $image) {
           if (isset($image))
              {
                $data = [
                     'path' => $this->imageService->upload($image),
                ];

                $product->images()->create($data);
              }
        }

    }



}
