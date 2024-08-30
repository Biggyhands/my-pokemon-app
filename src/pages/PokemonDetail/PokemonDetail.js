import React, { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../../utils/commons";
import { useNavigate, useParams } from "react-router-dom";

function NoPokemonFound() {
  return (
    <div className="pokemon-detail">
      <h2>MissingNO.</h2>
      <p>Pokemon was not found</p>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
        alt="No Pokémon"
      />
    </div>
  );
}

export default function PokemonDetail() {
  const params = useParams();
  const { id: pokemonId } = params;

  const [pokemon, setPokemon] = useState();

  const navigate = useNavigate();

  const getPokemon = async () => {
    const data = await fetchPokemonDetail(pokemonId);
    setPokemon(data);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const defaultImageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleImageError = (e) => {
    e.target.src = defaultImageUrl;
  };

  const handleBackToList = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>hola</h2>
      <div className="pokemon-detail">
        {pokemon === null && <NoPokemonFound />}
        {pokemon && (
          <>
            <h2>{pokemon.name}</h2>
            <img src={imageUrl} alt={pokemon.name} onError={handleImageError} />
            <p>#{pokemon.id}</p>
            <h3>Abilities</h3>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
            <h3>Types</h3>
            <ul>
              {pokemon.types.map((type) => (
                <li className="selected-li" key={type.type.name}>
                  {type.type.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        <button className="pokemon-button" onClick={handleBackToList}>
          Back to List
        </button>
      </div>
    </div>
  );
}
