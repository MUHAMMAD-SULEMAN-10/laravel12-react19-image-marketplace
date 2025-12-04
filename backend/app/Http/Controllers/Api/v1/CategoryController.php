<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryController extends Controller
{
    /**
     * Get all the categories
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        return CategoryResource::collection(Category::all());
    }
}
