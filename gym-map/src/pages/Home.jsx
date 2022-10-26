import React from "react";
import "./home.css";
import foto from "../assets/foto_home.svg";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home_container">
      <h1>Pesquise a Academia mais proxima de você</h1>
      <img src={foto} alt="" />
      
    </div>
  );
};

export default Home;
