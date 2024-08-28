import React from 'react';
import PokemonItem from './PokemonItem';

export default function List(props) {
    const { pokemonList, onPokemonClick } = props;

    return (
        <section className='card-List-Container'>
            {pokemonList.map(pokemon => (
                <PokemonItem key={pokemon.id} pokemon={pokemon} onClick={() => onPokemonClick(pokemon.id)} />
            ))}
        </section>
    );
}
