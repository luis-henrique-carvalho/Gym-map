import { useState, useEffect, useReducer } from "react";
import { db } from "../firabase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  erro: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertGym = (docCollection) => {
  //docCollection = dados enviados pelo formulário
  console.log(docCollection);
  //state    setState          Função do setState - state inicial
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertGym = async (gym) => {
    checkCancelBeforDispatch({
      type: "LOADING",
    });

    try {
      const newGym = { ...gym, createdAt: Timestamp.now() };
      const insertedGym = await addDoc(collection(db, docCollection), newGym);
      checkCancelBeforDispatch({ type: "INSERTED_DOC", payload: insertedGym });
    } catch (error) {
      checkCancelBeforDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertGym, response };
};
