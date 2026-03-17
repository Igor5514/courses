import {PageProps} from '@inertiajs/core';

type User = {
  id: number;
};

export type Puppy = {
  id: number;
  name: string;
  trait: string;
  imageUrl: string;
  likedBy: User["id"][];
};

export type PuppyProps =  {
  puppies: Puppy[];
}

export interface WelcomePageProps extends PageProps {
  auth: any;
  puppies: Puppy[];
}