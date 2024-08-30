export const fetchPokemonDetail = async (pokemonId) => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};
