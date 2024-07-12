// react
import { useState } from "react";
// firebase
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// GlobalContext
import { useGlobalContext } from "./useGlobalContext";
// Toast
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  const signIn = async (email, password) => {
    try {
      setIsPending(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, signIn };
};
