import SearchInput from "@/components/SearchInput";
import PokemonResult from "@/components/PokemonResult";
import TopPicks from "@/components/TopPicks";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Promise<{ name?: string }>;
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const name = searchParams.name;

  return (
    <main className="container">
       <h1 style={{
           fontSize: '3rem', 
           marginBottom: '2rem', 
           textAlign: 'center', 
           background: 'linear-gradient(to right, #6366f1, #ec4899)', 
           WebkitBackgroundClip: 'text', 
           WebkitTextFillColor: 'transparent'
       }}>
          Pokémon Search
       </h1>
       
       <Suspense fallback={<div className="loading">Loading Search...</div>}>
         <SearchInput />
       </Suspense>

       <div style={{width: '100%', marginTop: '2rem'}}>
          {name ? (
             <Suspense fallback={<div className="loading">Loading Result...</div>}>
               <PokemonResult />
             </Suspense>
          ) : (
             <TopPicks />
          )}
       </div>
    </main>
  );
}
