<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHabitRequest;
use App\Http\Requests\UpdateHabitRequest;
use Illuminate\Http\Request;
use App\Models\Habit;

class HabitsController extends Controller
{
    public function index()
    {
        $habits = Habit::all();
        return view('habits.index', ['habits' => $habits]);
    }
}
