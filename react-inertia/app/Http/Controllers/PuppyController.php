<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Http\Resources\PuppyResource;
use Illuminate\Http\Request;
use App\Models\Puppy;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;
use App\Actions\OptimizeImageWebpAction;
use App\Policies\PuppyPolicy;

class PuppyController extends Controller
{
    

    public function index(Request $request) {
        $search = $request->search;
        session()->flash('success', 'Welcome!');

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
            'likedPuppies' => $request->user() 
                ? PuppyResource::collection($request->user()->likedPuppies)
                : [],
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

            $optimized = OptimizeImageWebpAction::handle($request->file('image'));

            $path = 'puppies/' . $optimized['fileName'];
            $stored = Storage::disk('public')->put($path, $optimized['webpString']);

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

        return redirect()->route('home')->with('success', 'Puppy created successfully!');
        
    }

    public function destroy(Request $request, Puppy $puppy)
    {
        $imagePath = str_replace('/storage/', '', $puppy->image_url);

        $isOwner = $puppy->user_id == $request->user()->id;

        if($request->user()->cannot('delete', $puppy)){
            return back()->withErrors(['error' , 'You do not have permission to delete this puppy']);

        }

        $puppy->delete();

        if($imagePath && Storage::disk('public')->exists($imagePath)){
            Storage::disk('public')->delete($imagePath);
        }

        return redirect()
            ->route('home', ['page' => 1])
            ->with('success', 'Puppy deleted successfully');
    }
}
