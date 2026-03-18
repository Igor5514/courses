import { PageWrapper } from "@/components/PageWrapper";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Shortlist } from "@/components/Shortlist";
import { PuppiesList } from "@/components/PuppiesList";
import { NewPuppyForm } from "@/components/NewPuppyForm";
import { Props } from "node_modules/@headlessui/react/dist/types";
import { PuppyProps } from "@/types";

import { Suspense, use, useState } from "react";
import { Puppy } from "@/types";
import { getPuppies } from "@/queries";


export default function Home({puppies}: PuppyProps) {
    const [puppiesState, setPuppies] = useState<Puppy[]>(puppies);
    const [searchQuery, setSearchQuery] = useState("");

    console.log("puppies: ", puppies)

    return (
        <PageWrapper>
        <Container>
            <Header />


                <pre>{JSON.stringify(puppies, null,2)}</pre>
                
                <ul className="mt-4 flex flex-wrap gap-4">
                
                    {puppies.map((puppy, key) => (
                        <li key={key} className="bg-white p-6 ring ring-black/10 flex gap-2 ">
                            <img src = {puppy.image_url}
                                 alt={puppy.name}
                                 className="size-24 rounded-full object-cover" />
                            <div>
                                <h2>{puppy.name}</h2>
                                <p>Owned by {puppy.user.name}</p>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Shortlist puppies={puppies} setPuppies={setPuppies} />
       
  
        <PuppiesList
            puppies={puppies}
            setPuppies={setPuppies}
            searchQuery={searchQuery}
        />

        <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
            
        
        </Container>
        </PageWrapper>
  );
}

const puppyPromise = getPuppies();

