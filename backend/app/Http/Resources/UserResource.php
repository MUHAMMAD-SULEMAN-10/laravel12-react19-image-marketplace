<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\ImageResource;
use App\Http\Resources\PurchaseResource;
use App\Http\Resources\WithdrawalResource;
use App\Http\Resources\SellerEarningResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'role' => $this->role,
            'paypal_email' => $this->paypal_email,
            'image_count' => $this->images()->count(),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'earnings' => SellerEarningResource::make($this->whenLoaded('earnings')),
            'purchases' => PurchaseResource::collection($this->whenLoaded('purchases')),
            'withdrawals' => WithdrawalResource::collection($this->whenLoaded('withdrawals')),
        ];
    }
}
