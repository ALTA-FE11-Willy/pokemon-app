import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import Index from "../pages/Index";
import MyPokemonList from "../pages/MyPokemonList";
import PokemonDetail from "../pages/PokemonDetail";
import "../styles/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/detail/:id_monster",
    element: <PokemonDetail />,
  },
  {
    path: "/my-pokemon-list",
    element: <MyPokemonList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
