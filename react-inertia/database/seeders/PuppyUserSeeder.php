<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Puppy;
use App\Models\User;

class PuppyUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relationships = [
            [1,2],
            [2,2],
            [1,1],
        ];


        foreach($relationships as $relationship){
            [$puppyId, $userId] = $relationship;

            $puppy = Puppy::find($puppyId);

            if($puppy){
                $puppy->users()->attach($userId);
            }
        }

    }

}
