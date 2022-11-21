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
  }, [distancia, myLocation, gym]);

 

  return (
    <div className="detail_item">
      <h2>{gym.name}</h2>
      <h3>
        Valor da Mensalidade:<span className="span_home"> R$ {gym.price}</span>
      </h3>
      <p>
        Endereço: {gym.rua} {gym.bairro} {gym.cidade}-{gym.uf}
      </p>
      <div className="btn_home">
        {distancia ? (
          <h3>
            Distância ate você:{" "}
            <span className="span_home">{distancia / 1000} KM</span>
          </h3>
        ) : (
          <></>
        )}
      </div>

      <Link to={`/gym/${gym.id}`} className={"btn btn-outline btn_home"}>
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
