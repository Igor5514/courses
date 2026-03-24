import { Head } from '@inertiajs/react';
import Home from '../components/Home';
import { WelcomePageProps } from '@/types';
import Header from '@/components/welcome-page-components/Header';
import { useRef } from 'react';

export default function Welcome({ puppies, canRegister, auth, filters } : WelcomePageProps) {

    const homeRef = useRef<HTMLElement>(null);

    return (
        <>
        
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <Header auth={auth} canRegister={canRegister} />
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main  ref={homeRef} className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row scroll-mt-6">
                        <Home puppies={puppies} auth={auth} filters={filters} homeRef={homeRef} />
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
