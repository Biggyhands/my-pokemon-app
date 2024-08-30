import React, { useEffect, useState } from "react";
import SearchBar from "../../components/PokemonList/SearchBar";
import List from "../../components/PokemonList/List";
import { useForm } from "../../hooks/useForm";
import Pagination from "../../components/common/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const formHandler = useForm({ searchInput: "" });
  const { formState } = formHandler;
  const { searchInput } = formState;

  const navigate = useNavigate();

  const extractPokemonId = (url) => {
    const segments = url.split("/").filter((segment) => segment);
    return segments[segments.length - 1];
  };

  const fetchPokemonList = async (page) => {
    const limit = 20;
    const offset = page * limit;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      const processedData = data.results.map((pokemon) => ({
        ...pokemon,
        id: extractPokemonId(pokemon.url),
      }));
      setPokemonList(processedData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemonList([]);
    }
  };

  async function getPokemonByPartialMatch(partialName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=-1`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      console.log(data);
      const pokemonList = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(partialName.toLowerCase())
      );
      const processedData = pokemonList.map((pokemon) => ({
        ...pokemon,
        id: extractPokemonId(pokemon.url),
      }));

      if (processedData.length === 0) {
        throw new Error("No Pokemon Found");
      }
      setPokemonList(processedData);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemonList([]);
    }
  }

  useEffect(() => {
    if (searchInput.trim().length === 0) {
      fetchPokemonList(currentPage);
    }
  }, [searchInput, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput.trim().length !== 0) {
        getPokemonByPartialMatch(searchInput);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePokemonClick = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <>
      <header>
        <h1>Pokemon List</h1>
        <SearchBar formHandler={formHandler} />
      </header>

      <main>
        <List pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
      </main>

      {searchInput.trim().length === 0 && (
        <Pagination
          page={currentPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </>
  );
}
