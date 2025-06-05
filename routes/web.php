<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use \App\Http\Controllers\VendorController;

// Guest Route
Route::get('/', [ProductController::class, 'home'])
    ->name('dashboard');
Route::get('/product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');

Route::get('/d/{department:slug}', [ProductController::class, 'byDepartment'])
    ->name('product.byDepartment');

Route::get('/s/{vendor:store_name}', [VendorController::class, 'profile'])
    ->name('vendor.profile');

Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/store/{product}', 'store')
        ->name('cart.store');
    Route::put('/cart/{product}', 'update')
        ->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')
        ->name('cart.destroy');
});

Route::post('/stripe/webhook', [PaymentController::class, 'webhook'])
    ->name('stripe.webhook');

// Auth route
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'show'])->name('orders.show');



    Route::middleware(['verified'])->group(function () {
        Route::post('/cart/checkout', [CartController::class, 'checkout'])
            ->name('cart.checkout');

        Route::get('/stripe/success', [PaymentController::class, 'success'])
            ->name('stripe.success');

        Route::get('/stripe/failure', [PaymentController::class, 'failure'])
            ->name('stripe.failure');

        Route::post('/become-a-vendor', [VendorController::class, 'store'])
            ->name('vendor.store');

        Route::post('/stripe/connect', [PaymentController::class, 'connect'])
            ->name('stripe.connect')
            ->middleware(['role:' . \App\Enums\RolesEnum::Vendor->value]);

    });
});

require __DIR__.'/auth.php';
