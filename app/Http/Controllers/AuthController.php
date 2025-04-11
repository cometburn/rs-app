<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        if (empty($request->all())) {
            return response()->json([
                'message' => 'No data provided.',
            ], 400);
        }
    
        // Validate the input fields
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);


        // If validation fails, Laravel will automatically throw a ValidationException
        // and return the errors as a JSON response (in case of an API).

        // Create the user
        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Return the user data
        return response()->json($user, 201);
    }

    public function signin(Request $request) {
        // Validate the request input
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        $user = User::where('email', $validated['email'])->first();

        // Check if user exists and password matches
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        // Create token (Laravel Passport or Sanctum)
        $token = $user->createToken('auth_token')->accessToken;

        // Return success with token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
