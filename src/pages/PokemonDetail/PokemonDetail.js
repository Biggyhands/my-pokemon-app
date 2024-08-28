import React from 'react';

export default function PokemonDetail(props) {
    const { pokemon } = props;
    const { name, id, abilities, types } = pokemon;
    
    // Define the default image URL
    const defaultImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
    
    // Define the image URL based on the Pokémon ID
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    // Handle the case where the image is not available
    const handleImageError = (e) => {
        e.target.src = defaultImageUrl; 
    };

    return (
        <div className='pokemon-detail'>
            <h2>{name}</h2>
            <img src={imageUrl} alt={name} onError={handleImageError} />
            <p>#{id}</p>
            <h3>Abilities</h3>
            <ul>
                {abilities.map(ability => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
            <h3>Types</h3>
            <ul>
                {types.map(type => (
                    <li className='selected-li' key={type.type.name}>{type.type.name}</li>
                ))}
            </ul>
        </div>
    );
}
