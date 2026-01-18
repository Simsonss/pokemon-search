import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import PokemonResult from '@/components/PokemonResult';
import { pokemonMocks } from '../mocks/pokemon';
import React, { Suspense } from 'react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams({ name: 'Bulbasaur' }),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => '/',
}));

describe('PokemonResult', () => {
    it('renders Bulbasaur details correctly', async () => {
        render(
            <MockedProvider mocks={pokemonMocks}>
                 <PokemonResult />
            </MockedProvider>
        );
        
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        
        await waitFor(() => {
             expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        });
        
        expect(screen.getByText(/Grass, Poison/)).toBeInTheDocument();
        expect(screen.getByText(/Vine Whip/)).toBeInTheDocument();
    });
});

describe('Pokemon Data Integrity', () => {
    it('verifies Bulbasaur is Grass', () => {
        const mock = pokemonMocks.find(m => m.request.variables.name === 'Bulbasaur');
        // @ts-ignore
        const types = mock?.result.data.pokemon.types;
        expect(types).toContain('Grass');
    });
    
    it('verifies Charmander is Fire', () => {
        const mock = pokemonMocks.find(m => m.request.variables.name === 'Charmander');
        // @ts-ignore
        const types = mock?.result.data.pokemon.types;
        expect(types).toContain('Fire');
    });

    it('verifies Squirtle is Water', () => {
        const mock = pokemonMocks.find(m => m.request.variables.name === 'Squirtle');
        // @ts-ignore
        const types = mock?.result.data.pokemon.types;
        expect(types).toContain('Water');
    });
});
