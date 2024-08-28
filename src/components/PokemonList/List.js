import React from 'react'
import PokemonItem from './PokemonItem';

export default function List(props) {

const {pokemonList} = props;

  return (
    <section className='card-List-Container'>
        {pokemonList.map(pokemon =>
            <PokemonItem pokemon={pokemon}/>
        )}
    </section>
  )
}
