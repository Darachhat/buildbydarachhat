<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderViewResource extends JsonResource
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
            'total_price' => $this->total_price,
            'status' => $this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'vendorUser' => new VendorUserResource($this->vendorUser),
            'delivery' => [
                'recipient_name' => $this->recipient_name,
                'street' => $this->street,
                'city' => $this->city,
                'county' => $this->county,
                'phone' => $this->phone,
                'delivery_fee' => $this->delivery_fee,
                'delivery_status' => $this->delivery_status,
                'deliver_phone' => $this->deliver_phone,
            ],
            'orderItems' => $this->orderItems->map(fn($item) => [
                'id' => $item->id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'variation_type_option_ids' => $item->variation_type_option_ids,
                'product' => [
                    'id' => $item->product->id,
                    'title' => $item->product->title,
                    'slug' => $item->product->slug,
                    'description' => $item->product->description,
                    'image' => $item->product->getImageForOptions($item->variation_type_option_ids ?: []),
                ],
            ])
        ];
    }
}
