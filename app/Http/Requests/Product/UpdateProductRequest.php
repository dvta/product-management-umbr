<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'categories' => 'sometimes|array',
            'categories.*' => 'sometimes|integer|exists:categories,id',
            'images' => ['array'],
            'images.*.id' => 'nullable|integer|exists:images,id',
            'images.*.is_main' => 'sometimes|boolean',
            'images.*.file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
        ];
    }
}
