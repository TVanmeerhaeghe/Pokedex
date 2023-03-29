import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import PokemonService from "../services/pokemon-services";

//Déclare un nouveau type
//Type Props pour récupérer les pokemons
type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

//Type Field qui modélise u nchamp du formulaire
type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

//Type Form représente notre formulaire complet avec tous les champs
type Form = {
  picture: Field;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  //State qui represente les champs du formulaire
  //Par default données du pokemon reçue en entrée (Props)
  const [form, setForm] = useState<Form>({
    picture: { value: pokemon.picture },
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });
  // Recupére le hook useNavigate
  const navigate = useNavigate();
  //Affiche tous les types de pokemon disponible dans le formulaire
  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  // Permet de savoir si le pokemon visé appartient au pokemon
  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  //Methode qui réagit a chaque modification du champ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Regarde le nom du champ
    const fieldName: string = e.target.name;
    //Regarde la nouvelle valeur entrée
    const fieldValue: string = e.target.value;
    //Regroupe les deux élements dans un nouvel objet
    const newField: Field = { [fieldName]: { value: fieldValue } };

    //Set le form et fusionne les objet grace au spreadoperator
    setForm({ ...form, ...newField });
  };

  //Méthode qui permet de modifier les types du pokémon
  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //On récupére l'information : "Savoir si la case est cochée ou non"
    const checked = e.target.checked;
    let newField: Field;

    if (checked) {
      //Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      //Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    //Set le form et fusionne les objet grace au spreadoperator
    setForm({ ...form, ...{ types: newField } });
  };

  //Méthode qui gére l'envoie du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Bloque le comportement natif du formulaire
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      //Récupére les derniéres données depuis le state
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;

      // Vérifie si c'est le form edit est envoie sur update sinon renvoie sur add
      isEditForm ? updatePokemon() : addPokemon();
    }
  };

  //Méthode qui vérifie quel formulaire est apeller et affiche le champ picture quand dans le formulaire d'ajout
  const isAddForm = () => {
    return !isEditForm;
  };

  //Méthode qui valide les champs du formulaire
  const validateForm = () => {
    let newForm: Form = form;

    //Validate url
    if (isAddForm()) {
      const start =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      //Vérifie que les images commence bien par ce que le site veux ou finissent bien par ce que je veux
      if (
        !form.picture.value.startsWith(start) ||
        !form.picture.value.endsWith(end)
      ) {
        const errorMsg: string = "L'URL nest pas valide";
        const newField: Field = {
          value: form.picture.value,
          error: errorMsg,
          isValid: false,
        };
        newForm = { ...form, ...{ picture: newField } };
      } else {
        const newField: Field = {
          value: form.picture.value,
          error: "",
          isValid: true,
        };
        newForm = { ...form, ...{ picture: newField } };
      }
    }
    //Validation Name
    if (!/^[a-zA-Zàéè]{3,25}$/.test(form.name.value)) {
      const errorMsg: string =
        "Le nom du pokémon est requis (1 - 25)(a-z / A-Z / àéè).";
      const newField: Field = {
        value: form.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: Field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }

    //Validation hp
    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string =
        "Les points de vie du pokemon sont compris entre 0 et 999";
      const newField: Field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: Field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    //Validation cp
    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string =
        "Les dégats du pokemon sont compris entre 0 et 99";
      const newField: Field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    } else {
      const newField: Field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setForm(newForm);
    //Vérifie si les donnéees sont valides
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  };

  // Méthode qui vérifie le nombre de cases cochée pour les types
  const isTypeValid = (type: string): boolean => {
    // Empéche l'utilisateur de ne pas sélectionner de case
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }

    // Empéche l'utilisateur de sélectionner plus de 3 cases
    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }

    return true;
  };

  //Méthode qui s'occupe d'apeller le service deletePokemon
  const deletePokemon = () => {
    PokemonService.deletePokemon(pokemon).then(() => navigate("/pokemons"));
  };

  //Méthode qui s'occupe d'apeller le service addPokemon
  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => navigate("/pokemons"));
  };

  //Méthode qui s'occupe d'apeller le service updatePokemon
  const updatePokemon = () => {
    PokemonService.updatePokemon(pokemon).then(() =>
      navigate(`/pokemons/${pokemon.id}`)
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {/* Affiche uniquement l'image en cas d'édition */}
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
                <span className="btn-floating halfway-fab waves-effect waves-light">
                  <i onClick={deletePokemon} className="material-icons">
                    delete
                  </i>
                </span>
              </div>
            )}
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {/* Affiche le champ uniquement lors de l'ajout d'un pokémon */}
                {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input
                      id="picture"
                      name="picture"
                      type="text"
                      className="form-control"
                      value={form.picture.value}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    {/* Afficher seulement si le champ posséde une erreur */}
                    {form.picture.error && (
                      <div className="card-panel red accent-1">
                        {form.picture.error}
                      </div>
                    )}
                  </div>
                )}
                {/* Pokemon name */}
                <div className="form-group">
                  {/* Balise for en jsx devient htmlFor */}
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* Afficher seulement si le champ posséde une erreur */}
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {/* itére sur les types de pokemon */}
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          //Si un type n'est pas valide, verouille la case
                          disabled={!isTypeValid(type)}
                          // Utilise la méthode pour pré cocher les types qui appertiennent au pokemon visé
                          checked={hasType(type)}
                          //On passe le type et l'évenement
                          onChange={(e) => selectType(type, e)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Boutton envoie */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
