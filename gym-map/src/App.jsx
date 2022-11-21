import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; //mapeia de auth foi feita com sucesso
import './App.css'
//hooks
import { useAuthentication } from "./hooks/useAuthentication";

//Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Footer from "./components/Footer";
import About from "./pages/About";
import MyGyms from './pages/MyGyms'

import { AuthProvider } from "./context/AuthContext";
import CreateGym from "./pages/CreateGym";
import Gym from "./pages/Gym";

export const REACT_APP_GOOGLE_API_KEY = "AIzaSyAGRiv9DWRr-rtJ_ZCzVa2-E-tzrE9QnzA";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div >
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="gym/:id" element={<Gym/>} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/cadastro"
                element={!user ? <Cadastro /> : <Navigate to={"/"} />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/gym/create"
                element={user ? <CreateGym /> : <Navigate to={"/login"} />}
              />
              <Route
                path="mygyns"
                element={user ? <MyGyms/> : <Navigate to={"/login"} />}
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
