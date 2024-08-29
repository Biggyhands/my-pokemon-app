import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PokemonList from '../pages//PokemonList/PokemonList' 

test('renders Pokémon List header', () => {
  render(<PokemonList />);
  const headerElement = screen.getByText(/Pokemon List/i);
  expect(headerElement).toBeInTheDocument();
});

test('shows Pokémon items when fetched', async () => {
  render(<PokemonList />);

  const pokemonItems = await screen.findAllByRole('listitem');
  expect(pokemonItems).toHaveLength(20);
});
