import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { PokemonsType } from "../utils/types/pokemon";
import { TiDeleteOutline } from "react-icons/ti";

const MyPokemonList = () => {
  const [datas, setDatas] = useState<PokemonsType[]>([]);
  const navigate = useNavigate();

  function onClickDetail(index: number) {
    navigate(`/detail/${index}`);
  }

  function handleDelPokemon(data: PokemonsType) {
    let dupeDatas: PokemonsType[] = datas.slice();

    const filterData = dupeDatas.filter((item) => item.name !== data.name);
    localStorage.setItem("MyPokemon", JSON.stringify(filterData));
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [localStorage]);

  function fetchData() {
    const getPokemon = localStorage.getItem("MyPokemon");
    if (getPokemon) {
      setDatas(JSON.parse(getPokemon));
    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-2  gap-4 p-4">
        {datas?.map((data, index) => (
          <div
            key={index}
            className=" flex flex-col justify-center items-center content-center w-30 h-30  border-4 shadow-xl shadow-black border-black rounded-xl relative"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
              className="p-4 h-64"
              onClick={() => {
                onClickDetail(data.id);
              }}
            />
            <TiDeleteOutline
              className="h-10 w-10 absolute top-0 right-0 hover:cursor-pointer"
              onClick={() => handleDelPokemon(data)}
            />
            <div className="bg-black w-full text-lg uppercase p-2">
              <p>{data.name}</p>
              <p>({data.sub_name})</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MyPokemonList;
