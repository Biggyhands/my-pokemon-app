import React from 'react'
import iconPokemon from '../../assets/icon-pokemon.png';


export default function PokemonItem(props) {
    const {pokemon} = props
    const {name} =pokemon
console.log(pokemon)
  return (
    <div className='card-Item'>
        <img  src={iconPokemon}/> 
        <p>{name}</p>
    </div>
  )
}
