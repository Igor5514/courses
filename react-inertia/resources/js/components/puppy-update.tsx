import { useRef, useState } from "react";
import { EditIcon, LoaderCircle, TrashIcon } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from "@/components/ui/button";
import { Puppy } from "@/types";
import { DialogTrigger,Dialog, DialogTitle,DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import clsx from "clsx";


export function PuppyUpdate({puppy} : {puppy: Puppy}) {
    const [open, setOpen] = useState(false);

    const {post, setData, transform, data, errors, processing} = useForm({
        name: puppy.name,
        trait: puppy.trait,
        image: null as File | null,
    });
  
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="group/update bg-background/30 hover:bg-background" size="icon" variant="secondary" aria-label="Update puppy">
                    <EditIcon className="size-4" />
                </Button> 
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit {puppy.name}</DialogTitle>
                <DialogDescription>Make changes to your puppy's information below.</DialogDescription>
                    <form className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            transform((data) => ({
                                ...data,
                                _method: 'put',
                            }));
                            post(route('puppies.update', puppy.id));
                    
                        }}
                    >
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Full name"
                        />
                        {errors.name && <p className="text-xs mt-1 text-red-500">{errors.name}</p>}
                        <label htmlFor="trait">Personality trait</label>
                        <input
                            value={data.trait}  
                            className="mt-1 block w-full"
                            id="trait"
                            type="text"
                            required
                            placeholder="Personality trait"
                            onChange={(e) => setData('trait', e.target.value)}
                        />
                        {errors.trait && <p className="text-xs mt-1 text-red-500">{errors.trait}</p>}
                        <label htmlFor="image">Profile pic</label>
                        <input
                            className="mt-1 block w-full"
                            id="image"
                            type="file"
                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                            placeholder="Profile picture"
                        />
                        {errors.image && <p className=" text-xs mt-1 text-red-500">{errors.image}</p>}
                        
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Cencel</Button>
                            </DialogClose>
                        
                            <button className="relative disabled:opacity-100" disabled={processing} type="submit">
                                {processing && (
                                    <div className="absolute inset-0 grid place-items-center">
                                        <LoaderCircle className="size-5 animate-sping stroke-primary-foreground" />
                                    </div>
                                )}
                                <span className={clsx(processing && 'invisible')}>Update</span>
                            </button>
                        </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
        
   
     
  );
}


