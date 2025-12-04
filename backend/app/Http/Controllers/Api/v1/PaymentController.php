<?php

namespace App\Http\Controllers\Api\v1;

use Stripe\Stripe;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use App\Models\StripeSession;
use App\Models\SellingEarning;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Stripe\Exception\InvalidRequestException;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{

    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_KEY'));
    }

    /**
     * Pay orders
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function payOrder(Request $request): JsonResponse
    {
        $checkout_session = Session::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => 'Images Marketplace'
                    ],
                    'unit_amount' => $this->calculateTotalToPay($request->cartItems)
                ],
                'quantity' => 1
            ]],
            'mode' => 'payment',
            'success_url' => 'http://localhost:5173/pay/success/?session_id={CHECKOUT_SESSION_ID}'
        ]);

        return response()->json([
            'url' => $checkout_session->url
        ]);
    }

    /**
     * Calculate the total amount to pay
     *
     * @param array $items
     * @return float
     */
    private function calculateTotalToPay(array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $total += $item['qty'] * $item['price'];
        }

        return $total * 100;
    }

    /**
     * Check if payment is done successfully
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function paySuccess(Request $request): JsonResponse
    {
        $sellerPart = 70;
        $platformPart = 30;
        $sessionId = $request->session_id;

        if(!$sessionId) {
            return response()->json([
                'error' => 'Payment not done successfully try again later.'
            ]);
        }

        if(StripeSession::where('session_id', $sessionId)->exists()) {
            return response()->json([
                'error' => 'This session id has already been used.'
            ]);
        }

        try {
            Session::retrieve($sessionId);
            // Store session id
            StripeSession::create([
                'session_id' => $sessionId
            ]);

            DB::transaction(function() use ($request, $sellerPart, $platformPart) {
                $cartItems = $request->cartItems;

                foreach ($cartItems as $item) {
                    $sellerAmount = round($item['price'] * $sellerPart / 100, 2);
                    $platformAmount = round($item['price'] * $platformPart / 100, 2);

                    Purchase::create([
                        'user_id' => $request->user()->id,
                        'image_id' => $item['image_id'],
                        'amount' => $item['price'],
                        'seller_amount' => $sellerAmount,
                        'platform_commission' => $platformAmount,
                        'payment_status' => 'completed',
                    ]);

                    SellingEarning::updateOrCreate(
                        ['user_id' => $item['seller_id']],
                        []
                    );

                    SellingEarning::where('user_id', $item['seller_id'])->increment('total_earned', $sellerAmount);
                }
            });
            return response()->json([
                'message' => 'Payment is done successfully check your profile to download the images.',
                'user' => UserResource::make($request->user()->load('images', 'purchases', 'earnings', 'withdrawals')),
                'access_token' => $request->bearerToken()
            ]);

        } catch (InvalidRequestException $e) {
            return response()->json([
                'error' => 'This session is invalid.'
            ]);
        }
    }
}
