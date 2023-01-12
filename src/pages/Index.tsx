import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

interface PokemonsType {
  name?: string;
  url?: string;
}

const Index = () => {
  const [pokemons, setPokemons] = useState<PokemonsType[]>([]);
  const navigate = useNavigate();

  function onClickDetail(index: number) {
    navigate(`/detail/${index}`);
  }

  useEffect(() => {
    fetchDataPokemons();
  }, []);

  function fetchDataPokemons() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      .then((res) => {
        setPokemons(res.data.results);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  return (
    <Layout>
      <div className="grid grid-cols-2  gap-4 p-4">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className=" flex flex-col justify-center items-center content-center w-30 h-30  border-4 shadow-xl shadow-black border-black rounded-xl "
            onClick={() => {
              onClickDetail(index + 1);
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                index + 1
              }.svg`}
              alt=""
              className="p-4 h-64"
            />
            <div className="bg-black w-full text-lg uppercase p-2">
              {pokemon.name}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
