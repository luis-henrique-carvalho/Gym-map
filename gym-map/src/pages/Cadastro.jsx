import "./cadastro.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const Cadastro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Selecione uma categoria");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    console.log(category);

    const user = {
      displayName,
      email,
      password
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    if (category === "Selecione uma categoria") {
      setError("Adicione uma categoria");
      setCategory("Selecione uma categoria");
      return;
    }

    const res = await createUser(user);

    console.log(user);
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <div className="cadastro">
      <h1>Cadastre sua Academia</h1>
      <p>Melhore a procura da sua empresa</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do Estabelecimento"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          <span>Confime Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </label>

        <label>
          <span>Usuario ou Empresa:</span>
          <select
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option>Selecione uma categoria</option>
            <option>Usuário</option>
            <option>Empresa</option>
          </select>
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn">Aguarde...</button>}
        {error && <p className="error"> {error}</p>}
      </form>
    </div>
  );
};

export default Cadastro;
