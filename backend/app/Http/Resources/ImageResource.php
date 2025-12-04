<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ReviewResource;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float) $this->price,
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'seller' => UserResource::make($this->whenLoaded('seller')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'image_url' => asset($this->file_path),
            'downloads' => $this->downloads,
            'width' => $this->width,
            'height' => $this->height,
            'extension' => $this->extension,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
