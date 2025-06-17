<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Services\CartService;
use App\Enums\OrderStatusEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Show the user's cart with grouped cart items.
     */
    public function index()
    {
        return Inertia::render('Cart/Index', [
            'cartItems' => $this->cartService->getCartItemsGrouped(), // Get grouped cart items for display
        ]);
    }

    /**
     * Add a product to the user's cart.
     */
    public function store(Request $request, Product $product)
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
        $this->cartService->addItemToCart(
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
    public function update(Request $request, Product $product)
    {
        // Validate the request
        $request->validate([
            'quantity' => ['integer', 'min:1'],
        ]);

        // Extract option IDs and quantity
        $optionIds = $request->input('option_ids') ?: [];
        $quantity = $request->input('quantity');

        // Update item quantity
        $this->cartService->updateItemQuantity($product->id, $quantity, $optionIds);

        // Redirect back with success message
        return back()->with('success', 'ផលិតផលធ្វើបច្ចុប្បន្នភាពបានជោគជ័យ!');
    }

    /**
     * Remove a product from the cart.
     */
    public function destroy(Request $request, Product $product)
    {
        $optionIds = $request->input('option_ids'); // Get variation options (if any)

        // Remove item from the cart
        $this->cartService->removeItemFromCart($product->id, $optionIds);

        return back()->with('success', 'ផលិតផលត្រូវបានដកចេញពីកន្ទ្រកដោយជោគជ័យ!');
    }

    /**
     * Show delivery information form before checkout.
     */
    public function deliveryInfo(Request $request, CartService $cartService)
    {
        $vendorId = $request->input('vendor_id');

        if ($vendorId) {
            // Checkout for a specific vendor only
            $cartItems = $cartService->getCartItemsGrouped();
            $vendorCart = $cartItems[$vendorId] ?? null;

            if (!$vendorCart) {
                return redirect()->route('cart.index');
            }

            $subtotal = $vendorCart['totalPrice'];
        } else {
            // Checkout all items
            $subtotal = $cartService->getTotalPrice();
        }

        // Calculate delivery fee (you can adjust this logic)
        $deliveryFee = 2.00;
        $total = $subtotal + $deliveryFee;

        return Inertia::render('Cart/DeliveryInfo', [
            'vendorId' => $vendorId,
            'subtotal' => $subtotal,
            'deliveryFee' => $deliveryFee,
            'total' => $total
        ]);
    }

    /**
     * Process checkout and create Stripe session.
     */
    public function checkout(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Validate delivery information
        $validated = $request->validate([
            'vendor_id' => 'nullable|exists:users,id',
            'recipient_name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'county' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'delivery_fee' => 'numeric|min:0',
        ]);

        $vendorId = $validated['vendor_id'] ?? null;
        $deliveryFee = $validated['delivery_fee'] ?? 5.00;

        // Set Stripe API key
        \Stripe\Stripe::setApiKey(config('app.stripe_secret_key'));

        // Retrieve all grouped cart items
        $allCartItems = $this->cartService->getCartItemsGrouped();

        DB::beginTransaction(); // Start DB transaction

        try {
            // Determine items to checkout (all or specific vendor)
            $checkoutCartItems = $allCartItems;
            if ($vendorId) {
                $checkoutCartItems = [$vendorId => $allCartItems[$vendorId]];
            }

            $orders = [];    // To hold order objects
            $lineItems = []; // To pass to Stripe session

            foreach ($checkoutCartItems as $item) {
                $user = $item['user'];       // Vendor user
                $cartItems = $item['items']; // Items from cart

                // Create an order with delivery information
                $order = Order::create([
                    'session_id' => null,
                    'user_id' => $request->user()->id,
                    'vendor_user_id' => $user['id'],
                    'total_price' => $item['totalPrice'] + $deliveryFee,
                    'status' => OrderStatusEnum::Draft->value,
                    'recipient_name' => $validated['recipient_name'],
                    'street' => $validated['street'],
                    'city' => $validated['city'],
                    'county' => $validated['county'],
                    'phone' => $validated['phone'],
                    'delivery_fee' => $deliveryFee,
                    'delivery_status' => 'Pending'
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
                    Log::info('CartItem price', ['price' => $cartItem['price']]);

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

                // Add delivery fee as a separate line item
                $lineItems[] = [
                    'price_data' => [
                        'currency' => config('app.currency'),
                        'product_data' => [
                            'name' => 'Delivery Fee',
                            'description' => 'Shipping and handling',
                        ],
                        'unit_amount' => $deliveryFee * 100,
                    ],
                    'quantity' => 1,
                ];
            }

            if (empty($lineItems)) {
                throw new \Exception("Your cart is empty or something went wrong preparing your order.");
            }

            Log::info('Stripe lineItems', ['line_items' => $lineItems]);
            Log::info('User Email', ['customer_email' => $request->user()->email]);

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
            Log::info('Stripe session', ['session_id' => $session->id]);

            DB::commit(); // Commit the transaction

            return redirect($session->url); // Redirect to Stripe Checkout
        } catch (\Exception $e) {
            Log::error($e);   // Log error for debugging
            DB::rollBack();   // Rollback DB changes

            return back()->with('error', $e->getMessage() ?: 'មានអ្វីមួយខុសប្រក្រតី!'); // "Something went wrong!"
        }
    }
}
