<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    /**
     * Add new review
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Check if the user has already reviewed the image
        if($this->reviewAlreadyExists($request->image_id, $request->user()->id)) {
            return response()->json([
                'error' => 'You have already reviewed this image.'
            ]);
        }else {
            Review::create([
                'user_id' => $request->user()->id,
                'image_id' => $request->image_id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating
            ]);
            return response()->json([
                'message' => 'Your review has been added and pending approval.'
            ]);
        }
    }

    /**
     * Update a review
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        // Check if the user has already reviewed the image
        $review = $this->reviewAlreadyExists($request->image_id, $request->user()->id);
        if($review) {
            $review->update([
                'user_id' => $request->user()->id,
                'image_id' => $request->image_id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
                'approved' => 0
            ]);
            return response()->json([
                'message' => 'Your review has been updated and pending approval.'
            ]);
        }else {
            return response()->json([
                'error' => 'Something went wrong try again later.'
            ]);
        }
    }

    /**
     * Delete a review
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        // Check if the user has already reviewed the image
        $review = $this->reviewAlreadyExists($request->image_id, $request->user()->id);
        if($review) {
            $review->delete();
            return response()->json([
                'message' => 'Your review has been deleted.'
            ]);
        }else {
            return response()->json([
                'error' => 'Something went wrong try again later.'
            ]);
        }
    }

    /**
     * Check if review already exists
     *
     * @param integer $image_id
     * @param integer $user_id
     * @return Review|null
     */
    private function reviewAlreadyExists(int $image_id, int $user_id): ?Review
    {
        $review = Review::where([
            'user_id' => $user_id,
            'image_id' => $image_id
        ])->first();

        return $review;
    }
}
