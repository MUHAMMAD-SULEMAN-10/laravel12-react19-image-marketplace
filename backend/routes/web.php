<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ImageController;
use App\Http\Controllers\Admin\PurchaseController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WithdrawalController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'login'])->name('admin.login');
Route::post('admin/auth', [AdminController::class, 'auth'])->name('admin.auth');

Route::prefix('admin')->middleware('admin')->group(function() {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.index');
    Route::post('logout', [AdminController::class, 'logout'])->name('admin.logout');
    Route::resource('categories', CategoryController::class);
    Route::get('images', [ImageController::class, 'index'])->name('images.index');
    Route::get('image/{image}/{status}/update', [ImageController::class, 'updateImageStatus'])->name('image.update');
    Route::get('purchases', [PurchaseController::class, 'index'])->name('purchases.index');
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::delete('user/{user}/delete', [UserController::class, 'destroy'])->name('user.destroy');
    Route::get('reviews', [ReviewController::class, 'index'])->name('reviews.index');
    Route::get('review/{review}/{status}/update', [ReviewController::class, 'updateReviewStatus'])->name('review.update');
    Route::delete('review/{review}/delete', [ReviewController::class, 'destroy'])->name('review.destroy');
    Route::get('withdrawals', [WithdrawalController::class, 'index'])->name('withdrawals.index');
    Route::get('withdrawal/{withdrawal}/{status}/update', [WithdrawalController::class, 'updateWithdrawalStatus'])->name('withdrawal.update');
});
