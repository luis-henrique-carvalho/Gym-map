import React from "react";

import './gymDetail.css'

const GymDetail = ({ gym }) => {
  return (
    <div className="detail_item">
      <h2>{gym.name}</h2>
      <h3>Valor da Mensalidade:<span> R$ {gym.price}</span></h3>
      <p>Endereço: {gym.rua} {gym.bairro} {gym.cidade}-{gym.uf}</p>
    </div>
  );
};

export default GymDetail;
