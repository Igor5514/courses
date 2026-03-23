<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;
use Illuminate\Http\Request;
use App\Models\Puppy;

class PuppyController extends Controller
{
    

    public function index(Request $request) {
        $search = $request->search;

        return Inertia::render('welcome', [
            'puppies' => PuppyResource::collection(
                Puppy::query()
                ->when($search, function($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                          ->orWhere('trait', 'like', "%{$search}%");
                })
                ->with(['user', 'likedBy'])->paginate(6)
            ),
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function like(Request $request, Puppy $puppy) 
    {
        $puppy->likedBy()->toggle($request->user()->id);
        return back();
    }
}
