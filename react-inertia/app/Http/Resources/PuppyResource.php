<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class PuppyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'trait' => $this->trait,
            'image_url' => $this->image_url,
            'liked_by' => UserResource::collection($this->whenLoaded('liked_by')),
            'user' => UserResource::make($this->whenLoaded('user'))
        ];
    }
}
