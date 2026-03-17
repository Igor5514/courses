<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Models\Puppy;


Route::get('/',  function() {
    return Inertia::render('welcome', [
        'puppies' => Puppy::all(),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/api/puppies', function () {
    return response()->json([
        'puppies' => Puppy::all()
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
