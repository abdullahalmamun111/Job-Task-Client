import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const ContextApi = createContext(null);

const AuthContext = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // crete user

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // google login
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };


  useEffect(() => {
	const unSubsCribe = onAuthStateChanged(auth, (currentuser) => {
		setUser(currentuser);
		setLoading(false)
	});
	return () => {
		unSubsCribe();
	}
  } ,[])

  const authInfo = {
	user,
	setUser,
	loading,
	createUser,
	signIn,
	googleSignIn,
	logOut,
}

return (
	<ContextApi.Provider value={authInfo}>
		{children}
	</ContextApi.Provider>
)

};

export default AuthContext;
