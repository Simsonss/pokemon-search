import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from '@/components/SearchInput';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams({}),
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => '/',
}));

// Mock debounced callback to execute immediately
jest.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: Function) => fn,
}));

describe('SearchInput Suggestions', () => {
    it('shows suggestions when typing', () => {
        render(<SearchInput />);
        const input = screen.getByLabelText('Search Pokémon');
        
        // Type "Char"
        fireEvent.change(input, { target: { value: 'Char' } });
        
        // Should show Charmander, Charmeleon, Charizard from local json
        // Assuming pokemons.json has gen 1
        expect(screen.getByText('Charmander')).toBeInTheDocument();
        expect(screen.getByText('Charizard')).toBeInTheDocument();
    });

    it('hides suggestions when clicking outside', () => {
         render(<SearchInput />);
         const input = screen.getByLabelText('Search Pokémon');
         fireEvent.change(input, { target: { value: 'Char' } });
         expect(screen.getByText('Charmander')).toBeInTheDocument();

         fireEvent.mouseDown(document.body);
         expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    });
});
