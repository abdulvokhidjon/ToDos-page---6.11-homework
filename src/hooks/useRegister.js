// firebase imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// react imports
import { useState } from "react";
// context
import { useGlobalContext } from "./useGlobalContext";
// toast
import toast from "react-hot-toast";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  // Register with Google
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  // Register with email and password
  const registerEmailAndPassword = async (
    email,
    password,
    displayName,
    photoURL,
    confirmpassword
  ) => {
    if (confirmpassword !== password) {
      toast.error("Passwords did not match");
      return;
    }

    try {
      setIsPending(true);
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = register.user;
      await updateProfile(user, {
        photoURL,
        displayName,
      });

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Welcome, ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { registerWithGoogle, isPending, registerEmailAndPassword };
};
