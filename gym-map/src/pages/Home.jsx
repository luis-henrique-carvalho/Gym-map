import React from "react";
import "./home.css";
import { useFetchGym } from "../hooks/useFetchGym";
import GymDetail from "../components/GymDetail";
import { useState } from "react";
import { useEffect } from "react";
import {
  getLocationLocalStorage,
  setLocationLocalStorage,
} from "../context/util";
import { useAuthentication } from "../hooks/useAuthentication";

const Home = () => {
  const { documents: gyms, loading } = useFetchGym("academias");
  const { user } = useAuthentication();
  const [myLocation, setMyLocation] = useState();
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const myLocation = getLocationLocalStorage();

    if (myLocation) {
      setMyLocation(myLocation);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMyLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
    });
    setLocationLocalStorage({
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
    });
  };
  console.log(myLocation);

  return (
    <div className="home_container">
      <h1>Pesquise a Academia mais proxima de você</h1>
      {myLocation ? (
        <></>
      ) : (
        <form onSubmit={handleSubmit} className="form_location">
          <h2>Adicione Sua Localização</h2>
          <div className="form_location">
            <label>
              <span>Latitude</span>
              <input
                type="text"
                required
                placeholder="Digite a latitude"
                onChange={(e) => setLat(e.target.value)}
                value={lat}
              />
            </label>
            <label>
              <span>Logintude</span>
              <input
                type="text"
                placeholder="Digite a latitude"
                onChange={(e) => setLong(e.target.value)}
                value={long}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-outline">
            Adicionar{" "}
          </button>
        </form>
      )}
      {/* <h2>{gyms[1].name}</h2> */}
      <div className="gym__container">
        {gyms &&
          gyms.map((gym) => (
            <GymDetail myLocation={myLocation} key={gym.id} gym={gym} />
          ))}
      </div>
    </div>
  );
};

export default Home;
