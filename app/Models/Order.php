<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'session_id',
        'user_id',
        'total_price',
        'status',
        'website_commission',
        'payment_commission',
        'vendor_subtotal',
        'payment_intent',
        'vendor_user_id',
        'recipient_name',
        'street',
        'city',
        'county',
        'phone',
        'delivery_fee',
        'delivery_status',
        'deliver_phone',

    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vendorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_user_id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class, 'vendor_user_id', 'user_id');
    }
}
