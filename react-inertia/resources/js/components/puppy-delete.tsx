import { TrashIcon } from "lucide-react";
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

export function PuppyDelete({puppy} : {puppy: Puppy}){
    const {processing, delete:destroy} = useForm();

    return  (
        <div>
            <AlertDialog>
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
                            <AlertDialogAction type="submit">Delete {puppy.name}</AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}