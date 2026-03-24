<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;
use Illuminate\Http\Request;
use App\Models\Puppy;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;

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
                ->with(['user', 'likedBy'])
                ->latest()
                ->paginate(3)
                ->withQueryString()
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

    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'trait' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        if($request->hasFile('image')){

            $image = Image::read($request->file('image'));
            if($image->width() > 1000) {
                $image->scale(width: 1000);
            }

            $webpEncoded = $image->toWebp(quality: 95)->toString();

            $fileName = Str::random() . '.webp';

            $path = 'puppies/' . $fileName;
            $stored = Storage::disk('public')->put($path, $webpEncoded);

            if(!$stored){
                return back()->withErrors(['image' => 'Failed to upload image']);
            }   
            $image_url = Storage::url($path);

        }

        $request->user()->puppies()->create([
            'name' => $request->name,
            'trait' => $request->trait,
            'image_url' => $image_url,
        ]);

        return back()->with('success', 'Puppy created successfully!');
        
    }
}
