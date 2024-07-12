// firebase
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

// react
import { useEffect, useState } from "react";

export const useCollection = (collectionName, whereName, orderName) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where(...whereName),
      orderBy(...orderName)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const todos = [];
        querySnapshot.docs.forEach((doc) => {
          todos.push({ id: doc.id, ...doc.data() });
        });
        setData(todos);
      },
      (err) => {
        setError(err);
      }
    );

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return { data, error };
};
