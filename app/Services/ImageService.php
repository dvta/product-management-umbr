<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function upload($file)
    {
        return Storage::disk('public')->putFile('products', $file);
    }

    public function delete($path)
    {
        return Storage::disk('public')->delete($path);
    }


}
