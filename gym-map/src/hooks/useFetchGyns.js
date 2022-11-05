import { useState, useEffect } from "react";
import { db } from "../firabase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchGyns = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadGym() {
      if (cancelled) return;
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docsnap = await getDoc(docRef);
        setDocument(docsnap.data());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(true);
      }
    }

    loadGym();
  }, [docCollection, id, cancelled]);

  console.log(document);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
