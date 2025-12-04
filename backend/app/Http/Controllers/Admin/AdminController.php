<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Image;
use App\Models\Review;
use App\Models\Purchase;
use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\AdminAuthRequest;
use Illuminate\Validation\ValidationException;


class AdminController extends Controller
{
    /**
     * Display the admin dashboard
     *
     * @return View
     */
    public function index(): View
    {
        $total_images = Image::count();
        $total_users = User::count();
        $total_reviews = Review::count();
        $total_commission = Purchase::sum('platform_commission');
        $total_earnings = Purchase::sum('amount');
        $total_purchases = Purchase::count();

        return view('admin.index')->with([
            'total_images' => $total_images,
            'total_users' => $total_users,
            'total_reviews' => $total_reviews,
            'total_commission' => $total_commission,
            'total_earnings' => $total_earnings,
            'total_purchases' => $total_purchases,
        ]);
    }   

    /**
     * Display the admin login form
     *
     * @return void
     */
    public function login(): View | RedirectResponse
    {
        if(auth()->guard('admin')->check()) {
            return redirect()->back();
        }
        return view('admin.login');
    }

    /**
     * Auth the admin
     *
     * @param AdminAuthRequest $request
     * @return RedirectResponse
     */
    public function auth(AdminAuthRequest $request): RedirectResponse
    {
        if(auth()->guard('admin')->attempt($request->validated())) {
            $request->session()->regenerate();
            return to_route('admin.index');
        }else {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match any of our records.'
            ]);
        }
    }
    
    /**
     * Log out the admin
     *
     * @return RedirectResponse
     */
    public function logout(): RedirectResponse
    {
        auth()->guard('admin')->logout();
        return to_route('admin.login');
    }
}
