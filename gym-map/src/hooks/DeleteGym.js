import { useState, useReducer, useEffect } from "react";
import { db } from "../firabase/config";
import { doc, deleteDoc } from "firebase/firestore";


const initialState = {
  loadin: null,
  error: null,
};

const deleteRecucer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteGym = (docCollection) => {
  const [response, dispatch] = useReducer(deleteRecucer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteGym = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const deletedGym = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedGym,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {deleteGym, response}
};
