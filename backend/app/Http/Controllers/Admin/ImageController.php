<?php

namespace App\Http\Controllers\Admin;

use App\Models\Image;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $images = Image::with('category', 'seller')->latest()->get();
        return view('admin.images.index', compact('images'));
    }

    /**
     * Change image status
     *
     * @param Image $image
     * @param [type] $status
     * @return RedirectResponse
     */
    public function updateImageStatus(Image $image, $status): RedirectResponse
    {
        $image->update([
            'status' => $status
        ]);

        if($status === 'approved') {
            return to_route('images.index')->with('success', 'Image approved successfully.');
        }else {
            return to_route('images.index')->with('error', 'Image rejected successfully.');
        }
    }
}
