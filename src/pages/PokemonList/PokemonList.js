import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/PokemonList/SearchBar';
import List from '../../components/PokemonList/List';
import PokemonDetail from '../../pages/PokemonDetail/PokemonDetail';
import { useForm } from '../../hooks/useForm';

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); 

    const formHandler = useForm({ searchInput: '' });
    const { formState } = formHandler;
    const { searchInput } = formState;

    const extractPokemonId = (url) => {
        const segments = url.split('/').filter(segment => segment);
        return segments[segments.length - 1];
    };

    const fetchPokemonList = async () => {
        const limit = 20;
        const offset = (currentPage - 1) * limit;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      
        try {
            const response = await fetch(apiUrl); 
            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const data = await response.json(); 
            const processedData = data.results.map(pokemon => ({
                ...pokemon,
                id: extractPokemonId(pokemon.url)
            }));
            setPokemonList(processedData); 
            setErrorMessage(null); 
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setPokemonList([]);
            setErrorMessage('No Pokémon found :C');
        }
    };

    async function getPokemonByPartialMatch(partialName) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=-1`);
      
          if (!response.ok) {
            throw new Error(`Error fetching Pokémon: ${response.status}`);
          }
      
          const data = await response.json();
      
          const pokemonList = data.results.filter(pokemon => pokemon.name.toLowerCase().startsWith(partialName.toLowerCase()));
      
          return pokemonList;
        } catch (error) {
          console.error(error);
          return [];
        }
      }


    const fetchPokemonDetail = async (pokemonId) => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      
        try {
            const response = await fetch(apiUrl); 
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
      
            const data = await response.json(); 
            setSelectedPokemon(data);
            setErrorMessage(null); 
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setSelectedPokemon(null);
            setErrorMessage('No Pokémon found');
        }
    };

    useEffect(() => {
        if (searchInput.trim().length === 0 && !selectedPokemon) {
            fetchPokemonList();
        }
    }, [searchInput, currentPage, selectedPokemon]);
    
    useEffect(() => {
        if (searchInput.trim().length !== 0) {
            fetchPokemonDetail(searchInput);
        }
    }, [searchInput]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const newPage = prevPage + 1;
            fetchPokemonList(newPage); 
            return newPage;
        });
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => {
            const newPage = prevPage - 1;
            if (newPage >= 1) {
                fetchPokemonList(newPage); 
                return newPage;
            }
            return prevPage;
        });
    };

    const handlePokemonClick = (pokemonId) => {
        fetchPokemonDetail(pokemonId);
    };

    const handleBackToList = () => {
        setSelectedPokemon(null);
        setErrorMessage(null); 
    };

    return (
        <>
            <header>
                <h1>Pokemon List</h1>
                <SearchBar formHandler={formHandler} />
            </header>

            <main>
                {selectedPokemon || errorMessage ? (
                    <div className='pokemon-detail-container'>
                        <PokemonDetail pokemon={selectedPokemon} errorMessage={errorMessage} />
                        <button onClick={handleBackToList}>Back to List</button>
                    </div>
                ) : (
                    <List pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
                )}
            </main>

            {!selectedPokemon && !errorMessage && ( 
                <footer>
                    <div className="pagination">
                        <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button className="pagination-button" onClick={handleNextPage}>
                            More
                        </button>
                    </div>
                </footer>
            )}
        </>
    );
}
