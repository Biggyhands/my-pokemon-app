import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/PokemonList/SearchBar';
import List from '../../components/PokemonList/List';
import PokemonDetail from '../../pages/PokemonDetail/PokemonDetail' 
import { useForm } from '../../hooks/useForm';

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

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
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setPokemonList([]);
        }
    };

    const fetchPokemonDetail = async (pokemonId) => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      
        try {
            const response = await fetch(apiUrl); 
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
      
            const data = await response.json(); 
            setSelectedPokemon(data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
            setSelectedPokemon(null);
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
                fetchPokemonList(newPage); // Asegúrate de llamar a fetchPokemonList con el nuevo número de página
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
    };

    return (
        <>
            <header>
                <h1>Pokemon List</h1>
                <SearchBar formHandler={formHandler} />
            </header>

            <main>
                {selectedPokemon ? (
                    <div className='pokemon-detail-container'>
                        <PokemonDetail pokemon={selectedPokemon} />
                        <button onClick={handleBackToList}>Back to List</button>
                    </div>
                ) : (
                    <List pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
                )}
            </main>

            {!selectedPokemon && ( // Condicional para mostrar el footer solo si no hay un Pokémon seleccionado
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
