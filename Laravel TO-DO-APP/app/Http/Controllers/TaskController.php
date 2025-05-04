<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::latest()->get();  // Gets tasks ordered by newest first
        return view('index', compact('tasks'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'  // Basic validation
        ]);

        Task::create($request->only('name'));  // Safer than passing all request data

        return redirect('/tasks');
    }
}