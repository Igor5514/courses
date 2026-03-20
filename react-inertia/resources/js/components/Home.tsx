import { PageWrapper } from "@/components/PageWrapper";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Shortlist } from "@/components/Shortlist";
import { PuppiesList } from "@/components/PuppiesList";
import { NewPuppyForm } from "@/components/NewPuppyForm";

import {  useState } from "react";
import { Puppy } from "@/types";
import { getPuppies } from "@/queries";


export default function Home({puppies, auth}: {puppies: Puppy[], auth: any}) {
    const [puppiesState, setPuppies] = useState<Puppy[]>(puppies);
    const [searchQuery, setSearchQuery] = useState("");

    console.log("puppies: ", puppies)

    return (
        <PageWrapper>
        <Container>
            <Header />

                {/* <pre>{JSON.stringify(puppies, null,2)}</pre> */}
                
       
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {auth.user && <Shortlist puppies={puppies} setPuppies={setPuppies} />}
  
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

