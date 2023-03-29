import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-services";

const PokemonSearch: FunctionComponent = () => {
  //Definis l'état pour sauvegarder le terme recherche par l'utilisateur
  const [term, setTerm] = useState<string>("");
  //Stocke les pokémon définis par le terme de recherche
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  //Définis le comportement quand l'utilisateur saisit un terme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //Regarde l'input
    const term = e.target.value;
    //Met a jour l'état avec le terme saisit par l'utilisateur
    setTerm(term);

    //Vérifie que le terme a au moins deux caractéres
    //Si un seul on retourne un résultat vide
    if (term.length <= 1) {
      setPokemons([]);
      return;
    }

    //Apelle ma éthode Search Pokémon avec le term de l'utilisateur
    PokemonService.searchPokemon(term).then((pokemons) =>
      setPokemons(pokemons)
    );
  };

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card">
          <div className="card-content">
            <div className="input-field">
              <input
                type="text"
                placeholder="Rechercher un pokémon"
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="collection">
              {/* Liste les pokémons de la recherche */}
              {pokemons.map((pokemon) => (
                <Link
                  key={pokemon.id}
                  to={`/pokemons/${pokemon.id}`}
                  className="collection-item"
                >
                  {pokemon.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
