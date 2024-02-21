<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\QuotesController;
use App\Http\Controllers\QuotesPdfGenerator;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('app');
});



Route::get("/api/quotes",[QuotesController::class,"quotes"]);
Route::get("/api/quotes/detail",[QuotesController::class,"quotesDetail"]);


Route::post("/details",function (Request $request){
	$details = require resource_path('views/details.php');
	return $details;
})->middleware("auth");

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest');

Route::post("/login",[AuthenticatedSessionController::class, 'store'])
				->middleware("guest");

Route::get("/logout",function(Request $request){
	Auth::logout();
	echo "hello";
	return redirect("/");
})->middleware("auth");

Route::get("/user",function(Request $request){
	if($user = Auth::user()){
		return json_encode(["name"=>$user->First_Name]);
	}
	else{
		return json_encode(["name"=>null]);
	}
});

Route::get('/{any}', function () {
    return view('app');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::post("/book", [QuotesPdfGenerator::class,"sendMail"])->middleware("auth");

require __DIR__.'/auth.php';
