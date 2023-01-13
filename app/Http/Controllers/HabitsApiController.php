<?php

namespace App\Http\Controllers;

use App\Http\Resources\HabitResource;
use App\Models\Habit;
use Illuminate\Http\Request;

class HabitsApiController extends Controller
{
    public function index()
    {
        return HabitResource::collection(Habit::withCount('executions')->get());
    }
}
