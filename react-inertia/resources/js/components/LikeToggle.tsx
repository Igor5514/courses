import { Dispatch, SetStateAction, useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { Puppy } from "../types";
import { toggleLikedStatus } from "../queries";
import { usePage } from "@inertiajs/react";

export function LikeToggle({
  puppy,
  setPuppies,
}: {
  puppy: Puppy;
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
  const [pending, setPending] = useState(false);
  const auth = (usePage().props).auth.user

  return (
    <button
      className={`group ${!auth ? 'cursor-not-allowed' : ''} `}
      disabled={!auth}
      onClick={async () => {
        setPending(true);
        const updatedPuppy = await toggleLikedStatus(puppy.id);
        setPuppies((prevPups) => {
          return prevPups.map((existingPuppy) =>
            existingPuppy.id === updatedPuppy.id ? updatedPuppy : existingPuppy,
          );
        });
        setPending(false);
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
      
      <Heart
          className={
            puppy.liked_by.includes(1) && auth
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      
  
        
      )}
    </button>
  );
}
