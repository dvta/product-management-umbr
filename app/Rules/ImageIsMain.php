<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ImageIsMain implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //check is two or more images are marked as main
        if ($value) {
            $isMain = collect($value)->filter(fn ($image) => $image['is_main'] == true);
            if ($isMain->count() > 1) {
                $fail('Only one image can be marked as main');
            }
        }
    }
}
