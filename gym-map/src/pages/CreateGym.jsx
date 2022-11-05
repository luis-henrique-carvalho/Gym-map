import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useInsertGym } from "../hooks/useInsertGym";

import './createGym.css'

const CreateGym = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("")
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");

  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const { insertGym, response } = useInsertGym("academias");

  const navigate = useNavigate();

  console.log(user.category)

  const checkCep = (e) => {
    setCep(e.target.value.replace(/\D/g, ""))
    console.log(e)

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUf(data.uf)
        setBairro(data.bairro)
        setCidade(data.localidade)
        setRua(data.logradouro)

      });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    console.log(e);
    console.log(cep)

    if (!name || !price) {
      setFormError("Por favor, preencha todos os campos");
    }

    if (formError) return;

    insertGym({
      name,
      cep,
      cidade,
      rua,
      bairro,
      uf,
      uid: user.uid,
      createdBy: user.displayName,
      price,
    });

    navigate("/");
  };

  return (
    <div className="create_gym">
      <h2>Adicione sua Academia</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome :</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Digite o nome de sua academia"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Valor da Mensaliadade :</span>
          <input
            type="number"
            name="price"
            required
            placeholder="Digite o Valor da mensalidade de sua Academia"
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            value={price}
          />
        </label>

        <label>
          <span>CEP :</span>
          <input
            type="text"
            name="cep"
            required
            placeholder="Digite seu cep"
            onBlur={checkCep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
            value={cep}
          />
        </label>

        <label>
          <span>Cidade :</span>
          <input
            type="text"
            name="cidade"
            required
            placeholder="Digite seu Endereço"
            onChange={(e) => setCidade(e.target.value)}
            value={cidade}
          />
        </label>

        <label>
          <span>Endereço :</span>
          <input
            type="text"
            name="rua"
            required
            placeholder="Digite seu Endereço"
            onChange={(e) => setRua(e.target.value)}
            value={rua}
          />
        </label>

        <label>
          <span>Bairro :</span>
          <input
            type="text"
            name="bairro"
            required
            placeholder="Digite seu bairro"
            onChange={(e) => setBairro(e.target.value)}
            value={bairro}
          />
        </label>

        <label>
          <span>UF :</span>
          <input
            type="selection"
            name="uf"
            required
            placeholder="Digite seu bairro"
            onChange={(e) => setUf(e.target.value.toUpperCase())}
            value={uf}
          />
        </label>
        {!response.loading && (
          <button className="btn">Adicionar Academia</button>
        )}
        {response.loading && <button className="btn">Aguarde...</button>}
        {response.error && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreateGym;
