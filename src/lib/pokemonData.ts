import pokemons from '../data/pokemons.json';

// Memoize or just static list
const pokemonNames = pokemons.map((p) => p.name);

export function getPokemonSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];
  const lowerQuery = query.toLowerCase();
  // Return top 5 matches
  return pokemonNames
    .filter((name) => name.toLowerCase().includes(lowerQuery))
    .slice(0, 5);
}
