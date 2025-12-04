<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Store a new user
     *
     * @param RegisterUserRequest $request
     * @return JsonResponse
     */
    public function store(RegisterUserRequest $request): JsonResponse
    {
        $data = $request->validated();
        User::create($data);
        return response()->json([
            'message' => 'Account created successfully.'
        ]);
    }

    /**
     * Log in the user
     *
     * @param LoginUserRequest $request
     * @return JsonResponse
     */
    public function auth(LoginUserRequest $request): JsonResponse
    {
        $request->validated();
        $user = User::whereEmail($request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'These credentials do not match any of our records.'
            ]);
        }

        return response()->json([
            'message' => 'Logged in successfully.',
            'user' => UserResource::make($user->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $user->createToken('new_user')->plainTextToken
        ]);
    }

    /**
     * Log out users
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully.'
        ]);
    }

    /**
     * Switch between roles
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function switchRole(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->role = $request->role;
        $user->save();

        $newRole = ucfirst($request->role);

        return response()->json([
            'message' => "Role switched to $newRole successfully.",
            'user' => UserResource::make($user->load('images', 'purchases', 'earnings', 'withdrawals')),
            'access_token' => $request->bearerToken()
        ]);
    }
}
