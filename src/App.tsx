import React, { FunctionComponent } from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/page-not-found";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./pages/pokemon-add";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">
              Pokédex
            </Link>
          </div>
        </nav>
        {/* Systéme de gestion des routes via react-router-dom */}
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PokemonList />
              </PrivateRoute>
            }
          />
          <Route
            path="/pokemons"
            element={
              <PrivateRoute>
                <PokemonList />
              </PrivateRoute>
            }
          />
          <Route
            path="/pokemons/:id"
            element={
              <PrivateRoute>
                <PokemonsDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/pokemons/edit/:id"
            element={
              <PrivateRoute>
                <PokemonEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/pokemons/add"
            element={
              <PrivateRoute>
                <PokemonAdd />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
