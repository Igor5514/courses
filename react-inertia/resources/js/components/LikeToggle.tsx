import { useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { Puppy } from "../types";
import { toggleLikedStatus } from "../queries";
 import { Link } from '@inertiajs/react';
import {route}  from 'ziggy-js';
import { usePage } from "@inertiajs/react";
import clsx from "clsx";
import  { useForm } from "@inertiajs/react";


export function LikeToggle({
  puppy,
}: {
  puppy: Puppy;
}) {
  const auth = (usePage().props).auth.user

  const {processing, patch} = useForm({});

  return (
    <form className="h-full" 
    onSubmit={(e) => {
      e.preventDefault();
      patch(route('puppies.like', puppy.id), {
        preserveScroll: true,
      })
    }}>
      <button type="submit" className={`group ${!auth ? 'cursor-not-allowed' : ''} `}
      disabled={!auth || processing}>
      {
        processing ? (
          <LoaderCircle className=" animate-spin stroke-slate-300" /> 
        ) : (
        <Heart
          className={clsx(
            puppy.liked_by.includes(auth?.id) && auth
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300",

          )}
        />
        )
      }
      </button>
    </form>
      );
}
