<?php

namespace App\Http\Controllers;

// Importing necessary classes
use App\Enums\OrderStatusEnum;
use App\Http\Resources\OrderViewResource;
use App\Mail\CheckoutCompleted;
use App\Mail\NewOrderMail;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // Handles Stripe success page rendering
    public function success(Request $request)
    {
        $user = auth()->user(); // Get currently authenticated user
        $session_id = $request->get('session_id'); // Get session_id from query string

        $orders = Order::where('session_id', $session_id)->get(); // Fetch orders with this session ID

        if ($orders->count() === 0) {
            abort(404); // No matching orders found
        }

        foreach($orders as $order) {
            if($order->user_id !== $user->id) {
                abort(403); // User doesn't own the order
            }
        }

        // Render the success page with orders data
        return Inertia::render('Stripe/Success', [
            'orders' => OrderViewResource::collection($orders)->collection->toArray(),
        ]);
    }

    // Placeholder for handling payment failures
    public function failure(Request $request)
    {
        // You can implement logging or redirect here
    }

    // Handles incoming Stripe webhook events
    public function webhook(Request $request)
    {
        Log::info('Stripe webhook received.', [
            'method' => $request->method(),
            'payload' => $request->getContent(),
        ]);
        $stripe = new \Stripe\StripeClient(config('app.stripe_secret_key')); // Initialize Stripe client
        $endpoint_secret = config('app.stripe_webhook_secret'); // Get webhook secret

        $payload = $request->getContent(); // Raw request body
        $sig_header = request()->header('Stripe-Signature'); // Stripe signature header
        $event = null;

        try {
            // Verify and construct the Stripe event
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            Log::error($e);
            return response('Invalid payload.', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error($e);
            return response('Invalid signature.', 400);
        }

        // Handle specific event types from Stripe
        switch ($event->type) {
            case 'charge.updated':
                $charge = $event->data->object; // Charge object
                $transactionId = $charge['balance_transaction'];
                $paymentIntent = $charge['payment_intent'];

                // Retrieve transaction details including fees
                $balanceTransaction = $stripe->balanceTransactions->retrieve($transactionId);
                $orders = Order::where('payment_intent', $paymentIntent)->get();

                $totalAmount = $balanceTransaction['amount']; // Total paid amount
                $stripeFee = 0;

                // Extract Stripe fee from fee details
                foreach ($balanceTransaction['fee_details'] as $fee_details) {
                    if ($fee_details['type'] === 'stripe_fee') {
                        $stripeFee = $fee_details['amount'];
                    }
                }

                $platformFeePercent = config('app.platform_fee_percent'); // Platform fee from config

                foreach ($orders as $order) {
                    $vendorShare = $order->total_price / $totalAmount;

                    // Calculate commissions and vendor earnings
                    $order->payment_commission = $vendorShare * $stripeFee;
                    $order->website_commission = ($order->total_price - $order->payment_commission) / 100 * $platformFeePercent;
                    $order->vendor_subtotal = $order->total_price - $order->website_commission - $order->payment_commission;
                    $order->save();

                    // Notify the vendor
                    Mail::to($order->vendorUser)->send(new NewOrderMail($order));
                }

                // Notify the buyer
                // In charge.updated
                if ($orders->count() > 0) {
                    Mail::to($orders[0]->user)->send(new CheckoutCompleted($orders));
                } else {
                    Log::warning('No orders found for payment_intent', ['payment_intent' => $paymentIntent]);
                }
                break;

            case 'checkout.session.completed':
                $session = $event->data->object; // Stripe session object
                $pi = $session['payment_intent'];

                // Find orders by session ID and update them
                $orders = Order::query()
                    ->with(['orderItems'])
                    ->where(['session_id' => $session['id']])
                    ->get();

                $productsToDeleteFromCart = [];

                foreach ($orders as $order) {
                    $order->payment_intent = $pi;
                    $order->status = OrderStatusEnum::Paid; // Mark as paid
                    $order->save();

                    // Track products to remove from cart
                    $productsToDeleteFromCart = [
                        ...$productsToDeleteFromCart,
                        ...$order->orderItems->map(fn ($item) => $item->product_id)->toArray(),
                    ];

                    // Adjust product or variation quantity
                    foreach ($order->orderItems as $orderItem) {
                        $options = $orderItem->variation_type_option_ids;
                        $product = $orderItem->product;

                        if ($options) {
                            sort($options); // Ensure consistent array comparison
                            $variation = $product->variations()
                                ->where('variation_type_option_ids', $options)
                                ->first();

                            if ($variation && $variation->quantity != null) {
                                $variation->quantity -= $orderItem->quantity;
                                $variation->save();
                            }
                        } elseif ($product->quantity != null) {
                            $product->quantity -= $orderItem->quantity;
                            $product->save();
                        }
                    }
                }

                // Delete purchased items from cart
                if ($orders->count() > 0) {
                    $userId = $orders->first()->user_id;
                    CartItem::query()
                        ->where('user_id', $userId)
                        ->whereIn('product_id', $productsToDeleteFromCart)
                        ->where('saved_for_later', false)
                        ->delete();
                } else {
                    Log::warning('No orders found for session_id', ['session_id' => $session['id']]);
                }
                break;

            default:
                echo 'Received unknown event type: ' . $event->type;
        }

        return response('', 200); // Respond to Stripe that the webhook was handled
    }

    // Handles the Stripe Connect account linking
    public function connect()
    {
        // Create Stripe account if it doesn't exist
        if (!auth()->user()->getStripeAccountId()) {
            auth()->user()->createStripeAccount(['type' => 'express']);
        }

        // Redirect to Stripe onboarding if not complete
        if (!auth()->user()->isStripeAccountActive()) {
            return redirect(auth()->user()->getStripeAccountLink());
        }

        // Already connected
        return back()->with('success', 'Your account is already connected.');
    }
}
