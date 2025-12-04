<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Image;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\ImageResource;
use App\Http\Requests\AddImageRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageController extends Controller
{
    /**
     * Get the approved images
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $images = Image::with('category', 'seller', 'reviews.user', 'reviews.image')
            ->whereStatus('approved')->get();    
        return ImageResource::collection($images);
    }

    /**
     * Show a single image
     *
     * @param Image $image
     * @return JsonResource
     */
    public function show(Image $image): JsonResource
    {
        if($image->status === 'approved') {
            return ImageResource::make($image->load('category', 'seller', 'reviews.user', 'reviews.image'));
        } else {
          abort(404);  
        }
    }

    /**
     * Store a new image
     *
     * @param AddImageRequest $request
     * @return JsonResponse
     */
    public function store(AddImageRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($request->title);
        $data['user_id'] = $request->user()->id;
        $data['file_path'] = $this->saveImage($request->file('file'));

        Image::create($data);

        return response()->json([
            'message' => 'Image added successfully and is pending approval.',
            'user' => UserResource::make($request->user()->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $request->bearerToken()
        ]);
    }

    /**
     * Update an image
     *
     * @param Request $request
     * @param Image $image
     * @return JsonResponse
     */
    public function update(Request $request, Image $image): JsonResponse
    {
        $imageExists = Image::where('user_id', $request->user()->id)->findOrFail($image->id);
        
        if(!$imageExists) {
            return response()->json([
                'error' => 'Image not found.',
            ]);
        }

        if($request->has('title')) {
            $imageExists->title = $request->title;
            $imageExists->slug = Str::slug($request->title);
        }

        if($request->has('price')) {
            $imageExists->price = $request->price;
        }

        $imageExists->save();

        return response()->json([
            'message' => 'Image updated successfully.',
            'user' => UserResource::make($request->user()->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $request->bearerToken()
        ]);
    }

    /**
     * Save the image in the storage
     *
     * @param [type] $file
     * @return string
     */
    public function saveImage($file): string
    {
        $image_name = time().'_'.$file->getClientOriginalName();
        $path = $file->storeAs('images', $image_name, 'public');
        // return a link to the image http://localhost:8000/storage/images/name.png
        return Storage::url($path);
    }

    /**
     * Filter images
     *
     * @param Request $request
     * @return JsonResource
     */
    public function filterImages(Request $request): JsonResource
    {
        $images = Image::with('category', 'seller', 'reviews.user', 'reviews.image')
            ->whereStatus('approved')
            ->when($request->category_id, fn($q, $category_id) => $q->where('category_id', $category_id))
            ->when($request->extension, fn($q, $extension) => $q->where('file_path', 'like', '%.'.$extension))
            ->when($request->price, fn($q, $max) => $q->where('price', '<=', $max))
            ->when($request->searchTerm, fn($q, $searchTerm) => $q->where('title', 'like', '%'.$searchTerm.'%'))
            ->get();
        
        return ImageResource::collection($images);
    }

    /**
     * Download images
     *
     * @param Request $request
     * @return Response
     */
    public function download(Request $request, Image $image): Response
    {
        $user = $request->user();
        $path = str_replace('/storage/', '', $image->file_path);
        $imagePurchased = $user->purchases()->where('image_id', $image->id)->exists();
        $imageExists = Storage::disk('public')->exists($path);

        if(!$imagePurchased || !$imageExists) {
            abort(404);
        }else {
            $image->increment('downloads');
            return Storage::disk('public')->download($path);
        }
    }
}
