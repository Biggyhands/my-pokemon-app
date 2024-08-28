const phrases = [
    "Click to catch!",
    "Go search!",
    "Let's go Pokémon hunting!",
    "Explore the Pokémon world!",
    "Discover your next battle!",
    "Adventure awaits!",
    "Click to evolve!",
    "Find your favorite Pokémon!",
    "Search for legendary Pokémon!",
    "Your Pokémon adventure starts here!",
    "What Pokémon will you find?",
    "Become a Pokémon Master!",
    "Which is your favorite Pokémon?",
    "You have to catch them all!",
    "You Got to catch them all",
    "Don't you want to be the very best?!"
  ];

export const placeHolderPhrase = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex];
    return randomPhrase;
};

export default placeHolderPhrase;
