import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const UserContext = createContext();
//
const AuthProvider = ({ children }) => {
  //providers
  const googleProvider = new GoogleAuthProvider();
  // States
  const [user, setUser] = useState(null);
  const [loading, SetLoading] = useState(true);
  // signInWithGoogle
  const signUpWithGoogle = () => {
    loading;
    return signInWithPopup(auth, googleProvider);
  };
  //SignIn with password and email
  const emailAndPasswordSignup = (email, password) => {
    loading;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signIn with email and pass
  const loginWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // curent user chack
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (curentUser) => {
      setUser(curentUser);
      SetLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // signOut
  const logout = () => {
    return signOut(auth);
  };
  const getUser = {
    emailAndPasswordSignup,
    loginWithEmailAndPass,
    signUpWithGoogle,
    loading,
    user,
    logout,
  };

  return (
    <>
      <UserContext.Provider value={getUser}>{children}</UserContext.Provider>
    </>
  );
};

export default AuthProvider;
