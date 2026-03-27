import { LoaderCircle, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Puppy } from "@/types";
import { useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useState } from "react";
import clsx from "clsx";

export function PuppyDelete({puppy} : {puppy: Puppy}){
    const [open, setOpen] = useState(false);

    const {processing, delete:destroy} = useForm();

    return  (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="group/delete bg-background/30 hover:bg-background" size="icon" variant="secondary" aria-label="Delete puppy">
                        <TrashIcon className="size-4 group-hover/delete:stroke-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
               
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                destroy(route('puppies.destroy', puppy.id), {
                                    preserveScroll: true,
                                    
                                })
                            }}>
                            <Button className="disabled:opacity-100 relative" disabled={processing} type="submit">
                                {processing && 
                                    <div className="absolute inset-0 grid place-items-center">
                                        <LoaderCircle className="size-5 stroke-primary-foreground animate-spin" />

                                    </div>
                                } 
                                <span className={clsx(processing && 'invisible')}>Delete {puppy.name}</span>
     
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}