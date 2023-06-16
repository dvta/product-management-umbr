<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function upload($file)
    {
        $file = Storage::disk('public')->putFile('products', $file);
        return url(Storage::url($file)); // get full url
    }

    public function delete($path)
    {
        return Storage::disk('public')->delete($path);
    }


}
