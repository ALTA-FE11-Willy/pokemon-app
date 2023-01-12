import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { PokemonsType } from "../utils/types/pokemon";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<PokemonsType>();
  const { id_monster } = useParams();
  const [formName, setFormName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    fetchDataPokemons();
  }, []);

  function fetchDataPokemons() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id_monster}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function submitHandler() {
    const checkExist = localStorage.getItem("MyPokemon");
    if (checkExist) {
      let parseData = JSON.parse(checkExist);
      if (pokemon) {
        pokemon.sub_name = newName;
      }
      parseData.push(pokemon);

      localStorage.setItem("MyPokemon", JSON.stringify(parseData));
      alert("Added to My Pokemon");
    } else if (pokemon) {
      pokemon.sub_name = newName;
      localStorage.setItem("MyPokemon", JSON.stringify([pokemon]));
      alert("Added to My Pokemon");
    }
  }

  function handleCatch() {
    const randomize = Math.random().toFixed();
    if (randomize !== "0") {
      alert(`Congratulation! You caught ${pokemon?.name}`);
      setFormName(true);
    } else {
      alert(`Sorry you failed`);
      setFormName(false);
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-2  gap-4 p-4">
        <div className=" flex flex-col justify-center items-center content-center w-30 h-30  border-4 shadow-xl shadow-black border-black rounded-xl overflow-hidden">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id_monster}.svg`}
            alt=""
            className="p-4 h-64"
          />
          <div className="grid grid-cols-2 gap-5">
            {pokemon?.types.map((data, index) => (
              <p
                className="bg-green-600 border-2 py-3 rounded-3xl px-6 mb-3"
                key={index}
              >
                {data.type.name}
              </p>
            ))}
          </div>
        </div>
        <div className=" w-30 h-30  border-4 shadow-xl shadow-black border-black rounded-xl text-start p-5 text-xs grid gap-3 capitalize ">
          {pokemon?.stats.map((data) => (
            <div key={data.stat.name}>
              <p>{data.stat.name}</p>
              <div className="w-full bg-gray-400 dark:bg-gray-200 h-1">
                <div
                  className="bg-blue-600 h-1"
                  style={{ width: `${data.base_stat}%` }}
                ></div>
              </div>
              <p>{data.base_stat}</p>
            </div>
          ))}
        </div>
        <div className=" w-30 h-30  border-4 shadow-xl shadow-black border-black rounded-xl text-start p-5 text-xs grid gap-3 capitalize col-span-2 ">
          <p>Name: {pokemon?.name}</p>
          <p>Weight: {pokemon?.weight}</p>
          <p>Height: {pokemon?.height}</p>
        </div>
        <div className="  border-4 shadow-xl shadow-black border-black rounded-xl text-start p-5 text-xs capitalize ">
          {pokemon?.abilities.map((data) => (
            <p key={data.ability.name} className="mb-3">
              {data.ability.name}
            </p>
          ))}
        </div>
        <div className="  border-4 shadow-xl shadow-black border-black rounded-xl text-start p-5 text-xs capitalize ">
          {pokemon?.moves.slice(0, 5).map((data) => (
            <p key={data.move.name} className="mb-3">
              {data.move.name}
            </p>
          ))}
        </div>
        <div className="grid col-span-2  justify-center mt-3">
          {formName ? (
            <form className="mb-10">
              <label className="flex flex-col">
                <span className=" ">Enter Name</span>
                <input
                  className="text-black p-3 rounded-xl mb-3 w-40"
                  id="email"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button
                  className="border-4 shadow-xl bg-green-700 shadow-black border-black rounded-xl p-3 hover:cursor-pointer"
                  onClick={() => submitHandler()}
                >
                  Submit
                </button>
              </label>
            </form>
          ) : (
            <p className="hidden"></p>
          )}
          <a
            className="border-4 shadow-xl shadow-black border-black rounded-xl p-3 hover:cursor-pointer"
            onClick={() => handleCatch()}
          >
            {" "}
            Catch!
          </a>
        </div>
      </div>
    </Layout>
  );
};
export default PokemonDetail;
