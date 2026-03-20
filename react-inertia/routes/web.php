<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Models\Puppy;
use App\Http\Resources\PuppyResource;

Route::get('/',  function() {
    return Inertia::render('welcome', [
        'puppies' => PuppyResource::collection(Puppy::with(['user', 'likedBy'])->get()),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/api/puppies', function () {
    return response()->json([
        'puppies' => Puppy::all()
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch(
        'puppies/{puppy}/liked', [PuppyController::class, 'toggleLikedStatus']
    )->name('puppies.toggleLikedStatus');
    

    Route::inertia('home', 'welcome')->name('dashboard');
});

require __DIR__.'/settings.php';
