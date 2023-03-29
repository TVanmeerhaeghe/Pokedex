import Pokemon from "../models/pokemon";

export default class PokemonService {
  // Requette qui récupére tous les pokémon
  static getPokemons(): Promise<Pokemon[]> {
    //Retourne une promesse content un tableau de Pokémon
    //Requéte get sur l'url (Methode fetch)
    //Recupére l'objet response de fetch .json extrait les données qui nous intérésse
    return fetch(`http://localhost:3001/pokemons`).then((response) =>
      response.json().catch((error) => this.handleError(error))
    );
  }

  // Requete qui récupére un pokémon via son id
  static getPokemon(id: number): Promise<Pokemon | null> {
    // Retourne soit le pokémon visé soit une valeur nul si le pokémon n'existe pas
    return fetch(`http://localhost:3001/pokemons/${id}`).then((response) =>
      response
        .json()
        // Regarde si la valeur renvoyer est nul avec la méthode is Empty
        .then((data) => (this.isEmpty(data) ? null : data))
        .catch((error) => this.handleError(error))
    );
  }

  // Requete qui permet de modifier un pokemon
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      // Type de la requéte
      method: "PUT",
      // Corps de la réquete, on passe le pokémon modifié
      body: JSON.stringify(pokemon),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  //Requette qui permet de supprimer un Pokemon
  //Retourne un bojet vide lorsque le Pokemon est bien supprimé
  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      // Type de la requéte
      method: "DELETE",
      // Corps de la réquete, on passe le pokémon modifié
      body: JSON.stringify(pokemon),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  //Requete qui ajoute un pokemon
  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    //Supprime l'element created car services/format-date.tsx s'en occupe automatiquement
    delete pokemon.created;

    return fetch("http://localhost:3001/pokemons/", {
      // Type de la requéte
      method: "POST",
      // Corps de la réquete, on passe le pokémon modifié
      body: JSON.stringify(pokemon),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  // Si l'API renvoie un objet vide la méthode nous le signale avec un boolean
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  // Permet de récupérer les erreurs
  static handleError(error: Error): void {
    console.log(error);
  }

  //Requéte qui cherche un Pokemon
  //Retourne un tableau de Pokémon
  static searchPokemon(term: string): Promise<Pokemon[]> {
    //Recherche le pokémon grace a la syntaxe ?q=
    return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }
}
