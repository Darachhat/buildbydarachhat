<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    public static $wrap = false;
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
            'slug'  => $this->slug,
            'price'  => $this->getPriceForFirstOptions(),
            'quantity'  => $this->quantity,
            'image'  => $this->getFirstImageUrl(),
            'user'  => [
                'id'  => $this->user->id,
                'name' => $this->user->name,
                'store_name' => $this->user->vendor->store_name,
                'telegram_link' => $this->user->vendor->telegram_link,
            ],
            'department'  => [
                'id'  => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
            ],
        ];
    }
}
