import React from "react";
import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";


const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className="navbar">
      <Link to={"/"} className={'brand'} >
        Gym <span>Map</span>
      </Link>
      <ul className="links_list">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            Home
          </NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink
                to={"/gym/create"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Adicionar Academia
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/mygyns"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Minhas Academias
              </NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/cadastro"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Cadastro
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to={"/about"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
