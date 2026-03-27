import {PageProps} from '@inertiajs/core';
import { User } from './auth';

export type Puppy = {
  id: number;
  name: string;
  trait: string;
  image_url: string;
  user: Pick<User, "id" | "name">;
  liked_by: User["id"][];
  can: {
    delete: boolean;
    update: boolean;
  }
};

export type PuppyProps =  {
  puppies: Puppy[];
}

export interface WelcomePageProps extends PageProps {
  auth: any;
  puppies: PaginatedResponse<Puppy>;
  canRegister: any;
  filters: Filters;
  likedPuppies: Puppy[];
}

export interface Filters {
  search? : string;
  [key: string] : unknown;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}