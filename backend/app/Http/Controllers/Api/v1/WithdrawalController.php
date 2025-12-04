<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Http\Request;
use App\Models\SellingEarning;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class WithdrawalController extends Controller
{
    //
    public function withdraw(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            'paypal_email' => 'required|email|max:100'
        ]);

        $earnings = SellingEarning::where('user_id', $user->id)->first();

        if(!$earnings) {
            return response()->json([
                'error' => 'No earnings available to withdraw.'
            ]);
        }

        if($earnings->total_earned === 0) {
            return response()->json([
                'error' => 'You do not have enough earnings to withdraw.'
            ]);
        }

        if(!$user->paypal_email) {
            $user->paypal_email = $request->paypal_email;
            $user->save();
        }

        $amount = $earnings->total_earned;

        $earnings->increment('total_withdrawn', $amount);

        $earnings->update([
            'total_earned' => 0
        ]);

        $user->withdrawals()->create([
            'amount' => $amount
        ]);

        return response()->json([
            'message' => "Withdarawal successfully requested amount: $amount to paypal account: $user->paypal_email.",
            'user' => UserResource::make($request->user()->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $request->bearerToken()
        ]);
    }
}
