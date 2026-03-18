import {PageProps} from '@inertiajs/core';
import { User } from './auth';

export type Puppy = {
  id: number;
  name: string;
  trait: string;
  image_url: string;
  user: Pick<User, "id" | "name">;
  liked_by: User["id"][];
};

export type PuppyProps =  {
  puppies: Puppy[];
}

export interface WelcomePageProps extends PageProps {
  auth: any;
  puppies: Puppy[];
  canRegister: any;
}