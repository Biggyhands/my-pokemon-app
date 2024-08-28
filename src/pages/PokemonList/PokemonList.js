import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/PokemonList/SearchBar'
import List from '../../components/PokemonList/List'
import { useForm } from '../../hooks/useForm';

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])

    const formHandler = useForm({searchInput:''})
    const {formState} = formHandler
    const {searchInput} = formState;

    const fetchPokemonList = async () => {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
      
        try {
          const response = await fetch(apiUrl); 
          if (!response.ok) {
            throw new Error('Error al realizar la solicitud');
          }
      
          const data = await response.json(); 
          setPokemonList(data.results); 
        } catch (error) {
          console.error('Hubo un problema con la petición:', error);
          setPokemonList([]);
        }
    };

    const fetchPokemonDetail = async (pokemon) => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      
        try {
          const response = await fetch(apiUrl); 
          if (!response.ok) {
            throw new Error('Error al realizar la solicitud');
          }
      
          const data = await response.json(); 
          setPokemonList([data]) ; 
        } catch (error) {
          console.error('Hubo un problema con la petición:', error);
          setPokemonList([]);
        }
    };

    useEffect(()=>{
        searchInput.trim().length === 0 && fetchPokemonList()
    }, [searchInput]);
    
    useEffect(()=>{
        searchInput.trim().length !== 0 && fetchPokemonDetail(searchInput)
    }, [searchInput]);

  return (
    <>

    <header>
        <h1>Pokemon List</h1>
        <SearchBar formHandler={formHandler}/>

    </header>

    <main>
        <List pokemonList={pokemonList}/>
    </main>


    <footer>

    </footer>
    </>

    
  )
}
