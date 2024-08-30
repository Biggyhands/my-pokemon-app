import { Route, Routes } from "react-router-dom";
import PokemonList from "./pages/PokemonList/PokemonList";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail";

export const routes = (
  <Routes>
    <Route path="/" element={<PokemonList />} />
    <Route path="/pokemon/:id" element={<PokemonDetail />} />
  </Routes>
);
