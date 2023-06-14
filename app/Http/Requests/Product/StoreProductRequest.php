<?php

namespace App\Http\Requests\Product;

use App\Rules\ImageIsMain;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'categories' => 'required|array',
            'categories.*' => 'required|integer|exists:categories,id',
            'images' => ['array', new ImageIsMain()],
            'images.*.file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'images.*.is_main' => 'required|boolean',
            'description' => 'required|string',
            'price' => 'required|numeric',
        ];
    }
}
