"use client";

import { useQuery } from '@apollo/client/react';
import { GET_POKEMON } from '@/graphql/queries';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PokemonData, PokemonVars, Attack, Evolution } from '@/types/pokemon';

export default function PokemonResult() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const { replace } = useRouter();
  const pathname = usePathname();

  const { loading, error, data } = useQuery<PokemonData, PokemonVars>(GET_POKEMON, {
    variables: { name: name || "" },
    skip: !name,
  });

  const handleEvolutionClick = (evoName: string) => {
     const params = new URLSearchParams(searchParams);
     params.set("name", evoName);
     replace(`${pathname}?${params.toString()}`);
  };

  if (!name) return <div className="empty-state">Start by searching for a Pokémon!</div>;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-state">Error: {error.message}</div>;
  if (!data || !data.pokemon) return <div className="error-state">Pokémon "{name}" not found. Try another name.</div>;

  const { pokemon } = data;

  return (
    <div className="card">
        <div className="pokemon-header">
            {pokemon.image && (
                 <div className="image-container">
                    <img src={pokemon.image} alt={pokemon.name} className="pokemon-main-image" />
                 </div>
            )}
            <h2 className="pokemon-name">{pokemon.name} <span style={{fontSize: '1.5rem', opacity: 0.7}}>#{pokemon.number}</span></h2>
            <div className="pokemon-meta">
                <span>{pokemon.classification}</span>
                <span>•</span>
                <span>{pokemon.types.join(", ")}</span>
            </div>
            <div className="pokemon-meta" style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>
                <span>H: {pokemon.height.minimum} - {pokemon.height.maximum}</span>
                <span>W: {pokemon.weight.minimum} - {pokemon.weight.maximum}</span>
            </div>
        </div>

        <div>
            <h3 className="section-title">Attacks</h3>
            {pokemon.attacks ? (
                <>
                {pokemon.attacks.fast && (
                    <div style={{marginBottom: '1rem'}}>
                        <h4 style={{marginBottom:'0.5rem', color: 'var(--text-muted)'}}>Fast</h4>
                        <div className="attacks-grid">
                            {pokemon.attacks.fast.map((atk: Attack) => (
                                <div key={atk.name} className="attack-pill">
                                    {atk.name} ({atk.type}) <span style={{opacity:0.7, fontSize:'0.8em'}}>{atk.damage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 {pokemon.attacks.special && (
                    <div>
                        <h4 style={{marginBottom:'0.5rem', color: 'var(--text-muted)'}}>Special</h4>
                        <div className="attacks-grid">
                            {pokemon.attacks.special.map((atk: Attack) => (
                                <div key={atk.name} className="attack-pill" style={{borderColor: 'var(--primary)'}}>
                                    {atk.name} ({atk.type}) <span style={{opacity:0.7, fontSize:'0.8em'}}>{atk.damage}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                 )}
                </>
            ) : <p>No attacks info.</p>}
        </div>

        <div style={{marginTop: '2rem'}}>
            <h3 className="section-title">Evolutions</h3>
            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                <div className="evolutions-flex">
                    {pokemon.evolutions.map((evo: Evolution) => (
                        <div key={evo.id} className="evolution-card" onClick={() => handleEvolutionClick(evo.name)}>
                             {evo.image && <img src={evo.image} alt={evo.name} className="evolution-image" />}
                             <span style={{fontWeight: 'bold'}}>{evo.name}</span>
                             <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>#{evo.number}</span>
                             <span style={{fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem'}}>View Details</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{color: 'var(--text-muted)', textAlign: 'center'}}>This Pokémon does not evolve.</p>
            )}
        </div>
    </div>
  );
}
