<<<<<<< HEAD
=======
import { createContext, useEffect, useState } from "react";
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
<<<<<<< HEAD
import { createContext, useEffect, useState } from "react";
=======
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c

import app from "../firebase/firebase.config";
import useAxiosPublic from './../hooks/useAxiosPublic';

const auth = getAuth(app);

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
<<<<<<< HEAD
  const updateUserProfile = profileInfo => {
    return updateProfile(auth.currentUser, profileInfo);
=======
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("state changed", currentUser);
      setUser(currentUser);
      if (currentUser) {
        //get token and store in the client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
  
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authUser = {
    user,
    loading,
    createUser,
    updateUserProfile,
    loginUser,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
