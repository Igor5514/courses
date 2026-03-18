<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Puppy extends Model
{
    /**
     * Get the user that owns the Puppy
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function likedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

}
