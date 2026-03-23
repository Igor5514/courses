import { PageWrapper } from "@/components/PageWrapper";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Shortlist } from "@/components/Shortlist";
import { PuppiesList } from "@/components/PuppiesList";
import { NewPuppyForm } from "@/components/NewPuppyForm";
import {  useState } from "react";
import { Puppy,Filters } from "@/types";
import { getPuppies } from "@/queries";
import { Filter } from "lucide-react";


export default function Home({puppies, auth,filters}: {puppies: Puppy[], auth: any, filters : Filters }) {
    const [puppiesState, setPuppies] = useState<Puppy[]>(puppies);

    console.log("puppies: ", puppies)

    return (
        <PageWrapper>
        <Container>
            <Header />

                {/* <pre>{JSON.stringify(puppies, null,2)}</pre> */}
       
            <Search filters={filters}/>
            {auth.user && <Shortlist puppies={puppies} />}
  
        <PuppiesList puppies={puppies} />
        <NewPuppyForm puppies={puppies} setPuppies={setPuppies} />
        
        </Container>
        </PageWrapper>
  );
}

const puppyPromise = getPuppies();

