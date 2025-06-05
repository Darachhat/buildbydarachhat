<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use SimonHamp\LaravelStripeConnect\Traits\Payable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, Payable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function vendor(): HasOne
    {
        return $this->hasOne(Vendor::class, 'user_id');
    }
    public function products()
    {
        return $this->hasMany(\App\Models\Product::class, 'created_by');
    }

// As a vendor, sum income (all orders this user fulfilled as vendor)
    public function vendorIncome()
    {
        return \App\Models\Order::where('vendor_user_id', $this->id)->sum('vendor_subtotal');
    }

// As a customer, sum payments (all orders this user placed)
    public function totalPayments()
    {
        return \App\Models\Order::where('user_id', $this->id)->sum('total_price');
    }

}
