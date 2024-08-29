import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokemonItem from '../components/PokemonList/PokemonItem';

test('renders Pokémon item with name and image', () => {
  const pokemon = { id: 1, name: 'Bulbasaur' };
  render(<PokemonItem pokemon={pokemon} onClick={() => {}} />);
  expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});
