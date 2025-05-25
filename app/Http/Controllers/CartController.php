<?php

namespace App\Http\Controllers;

// Import required classes
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Enums\OrderStatusEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    /**
     * Show the user's cart with grouped cart items.
     */
    public function index(CartService $cartService)
    {
        return Inertia::render('Cart/Index', [
            'cartItems' => $cartService->getCartItemsGrouped(), // Get grouped cart items for display
        ]);
    }

    /**
     * Add a product to the user's cart.
     */
    public function store(Request $request, Product $product, CartService $cartService)
    {
        // Set default quantity if not provided
        $request->mergeIfMissing([
            'quantity' => 1
        ]);

        // Validate the request
        $data = $request->validate([
            'option_ids' => ['nullable', 'array'], // Product variation options
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        // Add product to the cart
        $cartService->addItemToCart(
            $product,
            $data['quantity'],
            $data['option_ids'] ?: []
        );

        // Redirect back with success message in Khmer
        return back()->with('success', 'ផលិតផលត្រូវបានបញ្ចូលទៅក្នុងកន្ទ្រកដោយជោគជ័យ');
    }

    /**
     * Update the quantity of a product in the cart.
     */
    public function update(Request $request, Product $product, CartService $cartService)
    {
        // Validate the request
        $request->validate([
            'quantity' => ['integer', 'min:1'],
        ]);

        // Extract option IDs and quantity
        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');

        // Update item quantity
        $cartService->updateItemQuantity($product->id, $quantity, $optionIds);

        // Redirect back with success message
        return back()->with('success', 'ផលិតផលធ្វើបច្ចុប្បន្នភាពបានជោគជ័យ!');
    }

    /**
     * Remove a product from the cart.
     */
    public function destroy(Request $request, Product $product, CartService $cartService)
    {
        $optionIds = $request->input('option_ids'); // Get variation options (if any)

        // Remove item from the cart
        $cartService->removeItemFromCart($product->id, $optionIds);

        return back()->with('success', 'ផលិតផលត្រូវបានដកចេញពីកន្ទ្រកដោយជោគជ័យ!');
    }

    /**
     * Checkout the cart and create a Stripe session.
     */
    public function checkout(Request $request, CartService $cartService)
    {
        // Set Stripe API key
        \Stripe\Stripe::setApiKey(config('app.stripe_secret_key'));

        $vendorId = $request->input('vendor_id'); // Optional: checkout for one vendor only

        // Retrieve all grouped cart items
        $allCartItems = $cartService->getCartItemsGrouped();

        DB::beginTransaction(); // Start DB transaction

        try {
            // Determine items to checkout (all or specific vendor)
            $checkoutCartItems = $allCartItems;
            if ($vendorId) {
                $checkoutCartItems = [$allCartItems[$vendorId]];
            }

            $orders = [];    // To hold order objects
            $lineItems = []; // To pass to Stripe session

            foreach ($checkoutCartItems as $item) {
                $user = $item['user'];       // Vendor user
                $cartItems = $item['items']; // Items from cart

                // Create an order
                $order = Order::create([
                    'session_id' => null,
                    'user_id' => $request->user()->id,
                    'vendor_user_id' => $user['id'],
                    'total_price' => $item['totalPrice'],
                    'status' => OrderStatusEnum::Draft->value,
                ]);

                if (!$order) {
                    throw new \Exception("ការបង្កើតការបញ្ជាទិញត្រូវបានបរាជ័យ"); // "Order creation failed"
                }

                $orders[] = $order;

                // Create order items and Stripe line items
                foreach ($cartItems as $cartItem) {
                    // Save order item
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem['product_id'],
                        'quantity' => $cartItem['quantity'],
                        'price' => $cartItem['price'],
                        'variation_type_option_ids' => $cartItem['option_ids'],
                    ]);

                    // Build a human-readable description of selected options
                    $description = collect($cartItem['options'])->map(function ($item) {
                        return "{$item['type']['name']}: {$item['name']}";
                    })->implode(', ');

                    // Stripe expects prices in cents
                    $lineItem = [
                        'price_data' => [
                            'currency' => config('app.currency'),
                            'product_data' => [
                                'name' => $cartItem['title'],
                                'images' => [$cartItem['image']],
                            ],
                            'unit_amount' => $cartItem['price'] * 100,
                        ],
                        'quantity' => $cartItem['quantity'],
                    ];

                    if ($description) {
                        $lineItem['price_data']['product_data']['description'] = $description;
                    }

                    $lineItems[] = $lineItem;
                }
            }

            // Create Stripe checkout session
            $session = \Stripe\Checkout\Session::create([
                'customer_email' => $request->user()->email,
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('stripe.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('stripe.failure'),
            ]);

            // Save session ID to each order
            foreach ($orders as $order) {
                $order->session_id = $session->id;
                $order->save();
            }

            DB::commit(); // Commit the transaction

            return redirect($session->url); // Redirect to Stripe Checkout
        } catch (\Exception $e) {
            Log::error($e);   // Log error for debugging
            DB::rollBack();   // Rollback DB changes

            return back()->with('error', $e->getMessage() ?: 'មានអ្វីមួយខុសប្រក្រតី!'); // "Something went wrong!"
        }
    }
}
