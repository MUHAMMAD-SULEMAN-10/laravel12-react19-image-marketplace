<?php

use App\Http\Controllers\Api\v1\CategoryController;
use App\Http\Controllers\Api\v1\ImageController;
use App\Http\Controllers\Api\v1\PaymentController;
use App\Http\Controllers\Api\v1\ReviewController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\WithdrawalController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class, 'logout']);
    Route::post('images', [ImageController::class, 'store']);
    Route::put('images/{image}/update', [ImageController::class, 'update']);
    Route::post('pay/order', [PaymentController::class, 'payOrder']);
    Route::post('pay/check', [PaymentController::class, 'paySuccess']);
    Route::get('images/{image}/download', [ImageController::class, 'download']);
    Route::post('review/store', [ReviewController::class, 'store']);
    Route::put('review/update', [ReviewController::class, 'update']);
    Route::post('review/delete', [ReviewController::class, 'delete']);
    Route::post('withdraw', [WithdrawalController::class, 'withdraw']);
    Route::post('switch/role', [UserController::class, 'switchRole']);
});


Route::get('images', [ImageController::class, 'index']);
Route::get('images/{image}', [ImageController::class, 'show']);
Route::get('categories', [CategoryController::class, 'index']);
Route::post('filter/images', [ImageController::class, 'filterImages']);


Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);