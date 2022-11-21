import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import GymDetail from "../components/GymDetail";

import { useAuthValue } from "../context/AuthContext";
import { useDeleteGym } from "../hooks/DeleteGym";
import { useFetchGym } from "../hooks/useFetchGym";
const MyGyms = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { deleteGym } = useDeleteGym("academias");

  const { documents: gyms, loading } = useFetchGym("academias", null, uid);

  console.log(uid);
  console.log(gyms);

  return (
    <div className="my_gyms">
      {loading && <h2>Carregando suas Academias</h2>}
      <h2>Suas Academias</h2>
      <p>Gerencie os Suas Academias</p>
      {gyms && gyms.length === 0 ? (
        <div className="no_gym">
          <p>Não foram encontradas academias</p>
          <Link to={"/gym/create"} className="btn">
            Adicionar sua academias
          </Link>
        </div>
      ) : (
        <></>
      )}

      {gyms &&
        gyms.map((gym) => (
          <div>
            <GymDetail key={gym.id} gym={gym} Click={deleteGym}/>
            
          </div>
        ))}
    </div>
  );
};

export default MyGyms;
