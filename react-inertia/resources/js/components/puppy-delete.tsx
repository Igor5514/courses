import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";

export function PuppyDelete(){
    return  (
        <div>
            <Button size="icon" variant="destructive">
                <TrashIcon className="size-4" />
            </Button>
        </div>
    )
}