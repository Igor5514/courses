<?php

namespace App\Actions;

use Illuminate\Http\UploadedFile;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;


class OptimizeImageWebpAction
{
    /**
     * Create a new class instance.
     */
    public static function handle(UploadedFile $file): array
    {
        $image = Image::read($file);

        if($image->width() > 1000) {
            $image->scale(width: 1000);
        }

        $encoded = $image->toWebp(quality: 95)->toString();
        $fileName = Str::random() . '.webp';
        
        return [
            'fileName' => $fileName,
            'webpString' => $encoded,
        ];
    }
}
