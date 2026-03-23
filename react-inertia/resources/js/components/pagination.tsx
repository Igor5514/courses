import { PaginatedResponse, PaginationLinks, PaginationMeta, Puppy } from "@/types"
import { cn } from '@/lib/utils';
import { Button } from "@headlessui/react";

type PaginationProps = {
    meta: PaginationMeta;
    links: PaginationLinks;
    className?: string;
}

export function Pagination(
    {meta, links, className} :  PaginationProps) 
{
    return (
        <div className={cn('flex items-center justify-between', className)} >
            {links.prev && 
                <Button>{links.prev}</Button>
            }

        </div>
    );



}