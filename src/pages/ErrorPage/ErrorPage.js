import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="error-page pokemon-detail-container">
      <h1>Error</h1>
      <div className="pokemon-detail">
        <h2>MissingNO.</h2>
        <p>Pokemon was not found</p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
          alt="No Pokémon"
        />
      </div>
      <button className="pokemon-button" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
}
