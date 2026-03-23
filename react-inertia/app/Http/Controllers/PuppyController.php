<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;

use Illuminate\Http\Request;
use App\Models\Puppy;

class PuppyController extends Controller
{
    public function index() {
         return Inertia::render('welcome', [
            'puppies' => PuppyResource::collection(Puppy::with(['user', 'likedBy'])->get()),
        ]);
    }

    public function like(Request $request, Puppy $puppy) 
    {
        $puppy->likedBy()->toggle($request->user()->id);
        return back();
    }
}
