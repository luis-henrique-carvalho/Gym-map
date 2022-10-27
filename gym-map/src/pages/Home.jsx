import React from "react";
import "./home.css";
import foto from "../assets/foto_home.svg";
import { Link, Navigate } from "react-router-dom";
import { useFetchGym } from "../hooks/useFetchGym";
import GymDetail from "../components/GymDetail";

const Home = () => {
  const { documents: gyms, loading } = useFetchGym("academias");

  console.log(gyms);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home_container">
      <h1>Pesquise a Academia mais proxima de você</h1>
      {/* <h2>{gyms[1].name}</h2> */}
      <div className="gym__container">
        {gyms && gyms.map((gym) => <GymDetail key={gym.id} gym={gym} />)}
      </div>
    </div>
  );
};

export default Home;
