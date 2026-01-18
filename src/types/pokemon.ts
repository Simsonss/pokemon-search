export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttacks {
  fast: Attack[];
  special: Attack[];
}

export interface Evolution {
  id: string;
  number: string;
  name: string;
  image: string;
}

export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttacks;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Evolution[];
  image: string;
}

export interface PokemonData {
  pokemon: Pokemon;
}

export interface PokemonVars {
  name: string;
}
