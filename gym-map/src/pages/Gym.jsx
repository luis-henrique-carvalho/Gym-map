import React from "react";
import './gym.css'

import { useParams } from "react-router-dom";
import { useFetchGyns } from "../hooks/useFetchGyns";

const Gym = () => {
  const { id } = useParams();
  const { document: gym, loading } = useFetchGyns("academias", id);

  return (
    
    <div className="post_container">
      {loading && <p>Carregando post...</p>}
      {gym && (
        <>
          <h1>{gym.name}</h1>
          <h2>Mensalidade: R$: {gym.price}</h2>
          <h3>Endereço: {gym.rua}, {gym.bairro}, {gym.cidade}-{gym.uf}</h3>
        </>
      )}
    </div>
  );
};

export default Gym;
