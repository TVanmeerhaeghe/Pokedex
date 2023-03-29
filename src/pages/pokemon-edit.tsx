import React, { FunctionComponent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-services";

const PokemonEdit: FunctionComponent = () => {
  // Définis le state pour sauvegarder le pokemon a afficher par défaut il est null
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { id } = useParams();

  // Boucle qui permet de récupérer le pokemon via son id et qui affecte le pokemon correspondant dans le set
  // Si aucun pokemon n'est trouver pokemon = null
  useEffect(() => {
    // Vérifie que l'id ne soit pas undefined
    if (!id) return;
    PokemonService.getPokemon(+id).then((pokemon) => setPokemon(pokemon));
  }, [id]);

  return (
    <div>
      {/* Vérifie que nosu avons bien trouver un pokemon grace a l'opérateur ternaire */}
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Éditer {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">
          <Loader />
        </h4>
      )}
    </div>
  );
};

export default PokemonEdit;
