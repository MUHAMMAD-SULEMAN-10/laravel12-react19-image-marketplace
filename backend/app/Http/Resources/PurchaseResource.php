<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
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
            'buyer' => UserResource::make($this->whenLoaded('buyer')),
            'image' => ImageResource::make($this->whenLoaded('image')),
            'amount' => $this->amount,
            'payment_status' => $this->payment_status,
        ];
    }
}
