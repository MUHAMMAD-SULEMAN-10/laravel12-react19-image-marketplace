<?php

namespace App\Http\Controllers\Admin;

use App\Models\Review;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $reviews = Review::with('user', 'image')->latest()->get();
        return view('admin.reviews.index', compact('reviews'));
    }

    /**
     * Change review status
     *
     * @param Review $review
     * @param [type] $status
     * @return RedirectResponse
     */
    public function updateReviewStatus(Review $review, $status): RedirectResponse
    {
        $review->update([
            'approved' => $status
        ]);

        if($status) {
            return to_route('reviews.index')->with('success', 'Review approved successfully.');
        }else {
            return to_route('reviews.index')->with('error', 'Review rejected successfully.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();
        return to_route('reviews.index')->with('success', 'Review deleted successfully.');
    }
}
