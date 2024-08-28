import React from 'react';

export default function PokemonItem(props) {
    const { pokemon, onClick } = props;
    const { name, id } = pokemon;
    const defaultImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const handleError = (e) => {
        e.target.src = defaultImageUrl; 
    };

    return (
        <div className='card-Item' onClick={onClick}>
            <img src={imageUrl} alt={name} onError={handleError} /> 
            <p>{name}</p>
            <span>#{id}</span>
        </div>
    );
}
