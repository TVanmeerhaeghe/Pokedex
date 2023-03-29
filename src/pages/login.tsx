import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../services/authentication-service";

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  username: Field;
  password: Field;
};

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  //Definis l'état
  const [form, setForm] = useState<Form>({
    username: { value: "" },
    password: { value: "" },
  });

  //Definis le message affiché de base sur composant login
  const [message, setMessage] = useState<string>(
    "Vous êtes déconnecté. (pikachu / pikachu)"
  );

  //Méthode qui récupé les value des champs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    //Set le form avec les novuelles informations
    setForm({ ...form, ...newField });
  };

  //Methode qui vérifie les champs
  const validateForm = () => {
    let newForm: Form = form;

    // Validator username
    if (form.username.value.length < 3) {
      const errorMsg: string =
        "Votre prénom doit faire au moins 3 caractères de long.";
      const newField: Field = {
        value: form.username.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField: Field = {
        value: form.username.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if (form.password.value.length < 6) {
      const errorMsg: string =
        "Votre mot de passe doit faire au moins 6 caractères de long.";
      const newField: Field = {
        value: form.password.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField: Field = {
        value: form.password.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);

    return newForm.username.isValid && newForm.password.isValid;
  };

  //Méthode qui gére les input rentré par l'utilisateur lors de la connexion
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Empéche le fonctionnement par defaut du formulaire
    e.preventDefault();
    const isFormValid = validateForm();
    //Vérifie si le form est valid grace a la méthode validateForm
    if (isFormValid) {
      //Si le form est valide affiche ce message
      setMessage("👉 Tentative de connexion en cours ...");
      //Passe les information a notre service d'authentification
      AuthenticationService.login(
        form.username.value,
        form.password.value
        //Vérifie les informations
      ).then((isAuthenticated) => {
        //Si elle ne corresponde pas renvoie ce message
        if (!isAuthenticated) {
          setMessage("🔐 Identifiant ou mot de passe incorrect.");
          return;
        }

        //Si les informations sont correct renvoie vers la page
        navigate("/pokemons");
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {/* Form message */}
                {message && (
                  <div className="form-group">
                    <div className="card-panel grey lighten-5">{message}</div>
                  </div>
                )}
                {/* Field username */}
                <div className="form-group">
                  <label htmlFor="username">Identifiant</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.username.error && (
                    <div className="card-panel red accent-1">
                      {form.username.error}
                    </div>
                  )}
                </div>
                {/* Field password */}
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {/* error */}
                  {form.password.error && (
                    <div className="card-panel red accent-1">
                      {form.password.error}
                    </div>
                  )}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
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

export default Login;
