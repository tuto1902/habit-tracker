<?php

use App\Http\Controllers\HabitsApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/habits', [HabitsApiController::class, 'index']);
Route::post('/habits', [HabitsApiController::class, 'store']);
Route::put('/habits/{habit}', [HabitsApiController::class, 'update']);
Route::delete('/habits/{habit}', [HabitsApiController::class, 'destroy']);
Route::post('/habits/{habit}/execution', [HabitsApiController::class, 'execution']);