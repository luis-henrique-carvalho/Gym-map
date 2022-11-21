import React from "react";
import { Link } from "react-router-dom";
import { getDistance, getPreciseDistance, GetCurrent } from "geolib";
import "./gymDetail.css";
import { useState, useEffect } from "react";

const GymDetail = ({ gym, myLocation, Click = null }) => {
  const [distancia, setDistancia] = useState(null);
  useEffect(() => {
    if (myLocation) {
      const newDistancia = getPreciseDistance(
        { latitude: gym.latitude, longitude: gym.longitude },
        myLocation,
        1
      );
      setDistancia(newDistancia);
    }
    console.log(distancia);
  }, [distancia, myLocation, gym]);
  console.log(distancia);

  return (
    <div className="detail_item">
      <h2>{gym.name}</h2>
      <h3>
        Valor da Mensalidade:<span> R$ {gym.price}</span>
      </h3>
      <p>
        Endereço: {gym.rua} {gym.bairro} {gym.cidade}-{gym.uf}
      </p>
      {distancia ? <p>Distância ate você: {distancia / 1000} KM</p> : <></>}

      <Link to={`/gym/${gym.id}`} className={"btn btn-outline"}>
        Detalhes
      </Link>
      {Click && (
        <button
          onClick={() => Click(gym.id)}
          className="btn btn-outline btn-danger"
        >
          Deletar
        </button>
      )}
    </div>
  );
};

export default GymDetail;
