<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;
use App\Models\Puppy;
use App\Http\Controllers\PuppyController;

Route::get('/', [PuppyController::class, 'index'])->name('home');

Route::get('/api/puppies', function () {
    return response()->json([
        'puppies' => Puppy::all()
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::patch('puppies/{puppy}/liked', [PuppyController::class, 'like']
    )->name('puppies.like');
    Route::post('puppies', [PuppyController::class, 'store']
    )->name('puppies.store');
    Route::put('puppies/{puppy}', [PuppyController::class, 'update'])
        ->name('puppies.update');
    Route::delete('puppies/{puppy}', [PuppyController::class, 'destroy'])
        ->name('puppies.destroy');
    
    Route::inertia('home', 'welcome')->name('dashboard');
});

require __DIR__.'/settings.php';
