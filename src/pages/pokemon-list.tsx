import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-services";
import { Link } from "react-router-dom";
import PokemonSearch from "../components/pokemon-search";

const PokemonList: FunctionComponent = () => {
  // <Pokemon[]> Type les données et assure le type géré par le state
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  //Hook d'effet
  useEffect(() => {
    // Utilise la class PokemonService et la méthode getPokemons qui nous permet de récupérer et mettre a jour avec les pokémons reçue
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
    //Tableau qui vide qui permet de ne pas déclencher le hook d'effet a chaque modification
  }, []);

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <PokemonSearch />
      <div className="container">
        <div className="row">
          {/* Itére sur les pokemons */}
          {pokemons.map((pokemon) => (
            // Utilisation du component PokemonCard qui affiche chaque pokemon depuis la liste
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <Link
          className="btn-floating btn-large waves-effect waves-light red z-depth-3"
          style={{ position: "fixed", bottom: "25px", right: "25px" }}
          to="/pokemons/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default PokemonList;
