<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderViewResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function show(Order $order)
    {
        $order->load(['orderItems.product', 'vendorUser']);
        return Inertia::render('Orders/Show', [
            'order' => new OrderViewResource($order),
        ]);
    }
    public function index()
    {
        $orders = Order::with(['orderItems.product', 'vendorUser'])
            ->where('user_id', auth()->id())
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Orders/History', [
            'orders' => OrderViewResource::collection($orders)->resolve(),

        ]);
    }

}
