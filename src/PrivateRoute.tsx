import React from "react";
import { Navigate } from "react-router-dom";
import AuthenticationService from "./services/authentication-service";

function PrivateRoute({ children }: any) {
  //Vérifie si l'utilisateur est connecté
  const isAuthenticated = AuthenticationService.isAuthenticated;

  //Si il est connecté renvoie le componenet demande sinon renvoei vers la page login
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
