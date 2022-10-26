import { db } from "../firabase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // REGISTER
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systeamErroMessage;

      if (error.message.includes("password")) {
        systeamErroMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systeamErroMessage = "E-mail já cadastrado";
      } else {
        systeamErroMessage = "Ocorreu erro, por favor tente mais tarde";
      }

      setLoading(false);
      setError(systeamErroMessage);
    }
  };

  // LOGOUT
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // Login
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systeamErroMessage;

      if (error.message.includes("user-not-found")) {
        systeamErroMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systeamErroMessage = "Senha incorreta";
      } else {
        systeamErroMessage = "Ocorreu um erro, por favor tente mais tarde";
      }
      setError(systeamErroMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
