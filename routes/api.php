<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutocompleteControllerFiller;
use App\Http\Controllers\CanDoorPickup;
use App\Http\Controllers\TextsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware("api")->get("/autocomplete/{country}",[AutocompleteControllerFiller::class,"autocomplete"]);
Route::middleware("api")->get("/autocomplete/countryForPort/{query}",[AutocompleteControllerFiller::class,"countryForPort"]);
Route::middleware("api")->get("/autocomplete/getLocode/{locode}",[AutocompleteControllerFiller::class,"getLocode"]);
Route::middleware("api")->get("/autocomplete/door/{doorPickupDelivery}",[AutocompleteControllerFiller::class,"pickupDelivery"]);
Route::middleware("api")->get("/pickup",[CanDoorPickup::class,"canPickup"]);
Route::middleware("api")->get("/texts",[TextsController::class,"getTexts"]);
