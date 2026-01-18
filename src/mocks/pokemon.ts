import { GET_POKEMON } from '@/graphql/queries';

export const pokemonMocks = [
  {
    request: {
      query: GET_POKEMON,
      variables: { name: 'Bulbasaur' },
    },
    result: {
      data: {
        pokemon: {
          id: 'bulbasaur-id',
          number: '001',
          name: 'Bulbasaur',
          image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
          classification: 'Seed Pokémon',
          types: ['Grass', 'Poison'],
          weight: { minimum: '6kg', maximum: '8kg' },
          height: { minimum: '0.6m', maximum: '0.8m' },
          attacks: {
             fast: [{name: 'Tackle', type: 'Normal', damage: 5}],
             special: [{name: 'Vine Whip', type: 'Grass', damage: 40}]
          },
          evolutions: [{id: 'ivysaur', number: '002', name: 'Ivysaur', image: 'https://img.pokemondb.net/artwork/ivysaur.jpg'}],
        },
      },
    },
  },
  {
    request: {
      query: GET_POKEMON,
      variables: { name: 'Charmander' },
    },
    result: {
      data: {
        pokemon: {
          id: 'charmander-id',
          number: '004',
          name: 'Charmander',
          image: 'https://img.pokemondb.net/artwork/charmander.jpg',
          classification: 'Lizard Pokémon',
          types: ['Fire'],
          weight: { minimum: '7kg', maximum: '9kg' },
          height: { minimum: '0.5m', maximum: '0.7m' },
          attacks: {
             fast: [{name: 'Scratch', type: 'Normal', damage: 6}],
             special: [{name: 'Ember', type: 'Fire', damage: 40}]
          },
          evolutions: [{id: 'charmeleon', number: '005', name: 'Charmeleon', image: 'https://img.pokemondb.net/artwork/charmeleon.jpg'}],
        },
      },
    },
  },
  {
      request: {
        query: GET_POKEMON,
        variables: { name: 'Squirtle' },
      },
      result: {
        data: {
          pokemon: {
            id: 'squirtle-id',
            number: '007',
            name: 'Squirtle',
            image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
            classification: 'Tiny Turtle Pokémon',
            types: ['Water'],
            weight: { minimum: '8kg', maximum: '10kg' },
            height: { minimum: '0.4m', maximum: '0.6m' },
            attacks: {
               fast: [{name: 'Tackle', type: 'Normal', damage: 5}],
               special: [{name: 'Bubble', type: 'Water', damage: 40}]
            },
            evolutions: [{id: 'wartortle', number: '008', name: 'Wartortle', image: 'https://img.pokemondb.net/artwork/wartortle.jpg'}],
          },
        },
      },
    },
];
