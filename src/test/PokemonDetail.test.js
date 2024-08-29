import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokemonDetail from '../pages/PokemonDetail/PokemonDetail'; 
test('renders Pokémon detail with name, image, abilities, and types', () => {
  const pokemon = {
    name: 'Bulbasaur',
    id: 1,
    abilities: [{ ability: { name: 'overgrow' } }],
    types: [{ type: { name: 'grass' } }]
  };

  render(<PokemonDetail pokemon={pokemon} />);
  expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
  expect(screen.getByText(/grass/i)).toBeInTheDocument();
});
