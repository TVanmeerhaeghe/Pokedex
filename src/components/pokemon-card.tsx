import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-card.css";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import { useNavigate } from "react-router-dom";

//Déclare un nouveau type
type Props = {
  pokemon: Pokemon;
  //? = Facultatif
  borderColor?: string;
};

// Liaison du type Props et récupération grace aux destructuring
const PokemonCard: FunctionComponent<Props> = ({
  pokemon,
  borderColor = "#009688",
}) => {
  //Stocke la couleur actuelle de la bordure
  const [color, setColor] = useState<string>();
  //Récupére un objet de l'historique du nagivateur via le hook useNavigate
  const navigate = useNavigate();

  const showBorder = () => {
    setColor(borderColor);
  };

  const hideBorder = () => {
    setColor("#f5f5f5");
  };

  const goToPokemon = (id: number) => {
    navigate(`/pokemons/${id}`);
  };

  return (
    <div
      className="col s6 m4"
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
      onClick={() => goToPokemon(pokemon.id)}
    >
      <div className="card horizontal" style={{ borderColor: color }}>
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
            </p>
            {pokemon.types.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
