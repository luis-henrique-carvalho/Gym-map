import React from "react";
import { Link } from "react-router-dom";

import "./gymDetail.css";

const GymDetail = ({ gym, Click = null }) => {
  return (
    <div className="detail_item">
      <h2>{gym.name}</h2>
      <h3>
        Valor da Mensalidade:<span> R$ {gym.price}</span>
      </h3>
      <p>
        Endereço: {gym.rua} {gym.bairro} {gym.cidade}-{gym.uf}
      </p>
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
