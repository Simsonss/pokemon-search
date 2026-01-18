import SearchInput from "@/components/SearchInput";
import PokemonResult from "@/components/PokemonResult";
import { Suspense } from "react";

export default function Home() {
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

       <Suspense fallback={<div className="loading">Loading Result...</div>}>
         <PokemonResult />
       </Suspense>
    </main>
  );
}
