import { PageWrapper } from "@/components/PageWrapper";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Shortlist } from "@/components/Shortlist";
import { PuppiesList } from "@/components/PuppiesList";
import { NewPuppyForm } from "@/components/NewPuppyForm";
import {  useRef } from "react";
import { Puppy,Filters, PaginatedResponse } from "@/types";
import { getPuppies } from "@/queries";


export default function Home(
    {puppies, auth, filters, homeRef} : 
    {puppies: PaginatedResponse<Puppy> , auth: any, filters: Filters, homeRef: React.RefObject<HTMLElement>}) 
{
    return (
        <PageWrapper>
            <div>

            </div>
        <Container >
            <Header />

                {/* <pre>{JSON.stringify(puppies, null,2)}</pre> */}
       
            <Search filters={filters} />
            {auth.user && <Shortlist puppies={puppies.data} />}
    
            <PuppiesList puppies={puppies} />
            {auth.user && <NewPuppyForm homeRef={homeRef} />}
        
        </Container>
        </PageWrapper>
  );
}

const puppyPromise = getPuppies();

