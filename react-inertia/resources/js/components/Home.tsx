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


    return (
        <PageWrapper>
        <Container>
            <Header />
           
            {/* <pre>{JSON.stringify(puppies, null,2)}</pre> */}
            
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Shortlist puppies={puppies} setPuppies={setPuppies} />
        </div>
  
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

