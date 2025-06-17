<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeliveryController extends Controller
{
    public function update(Request $request, Order $order)
    {
        // Ensure user is authorized (either admin or the vendor of this order)
        if (Auth::id() !== $order->vendor_user_id && !Auth::user()->hasRole('Admin')) {
            return back()->with('error', 'អ្នកមិនមានសិទ្ធិធ្វើបច្ចុប្បន្នភាពការបញ្ជាទិញនេះទេ');
        }

        $validated = $request->validate([
            'delivery_status' => 'required|in:Pending,Packing,Shipping,Received',
            'deliver_phone' => 'nullable|string|max:20',
        ]);

        $order->update($validated);

        return back()->with('success', 'ស្ថានភាពដឹកជញ្ជូនត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ');
    }
}
