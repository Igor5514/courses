<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            $user = User::find($userId);

            if($puppy && $user){
                $puppy->users()->attach($userId);
            }
        }

    }

}
