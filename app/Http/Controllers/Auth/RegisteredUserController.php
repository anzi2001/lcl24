<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'First_Name' => 'required|string|max:255',
			'Last_Name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
			"company" => "string|max:255",
            'password' => 'required|string|confirmed|min:8',
			'password_confirmation' => 'required',
			'Title' => 'string|max:255',
			'Company_name' => 'string|max:255'
        ]);

        Auth::login($user = User::create([
            'First_Name' => $request->First_Name,
			'Last_Name' => $request->Last_Name,
            'email' => $request->email,
			'Title'=> $request->Title,
			'Company_name'=>$request->Company_name,
            'password' => Hash::make($request->password),
        ]));

        event(new Registered($user));

        return redirect(RouteServiceProvider::HOME);
    }
}
