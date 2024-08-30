import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";

describe("List component", () => {
  const mockPokemonList = [
    { id: 1, name: "Bulbasaur" },
    { id: 2, name: "Ivysaur" },
  ];

  const mockOnPokemonClick = jest.fn();

  it("render mocked items correctly", () => {
    render(
      <List pokemonList={mockPokemonList} onPokemonClick={mockOnPokemonClick} />
    );

    const pokemon1 = screen.getByText(/Bulbasaur/i);
    const pokemon2 = screen.getByText(/Ivysaur/i);
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).toBeInTheDocument();
  });

  it("calls onPokemonClick with the correct ID when a Pokemon item is clicked", () => {
    render(
      <List pokemonList={mockPokemonList} onPokemonClick={mockOnPokemonClick} />
    );

    const pokemonItem = screen.getByText("Bulbasaur");
    fireEvent.click(pokemonItem);

    expect(mockOnPokemonClick).toHaveBeenCalledWith(1);
  });
});
