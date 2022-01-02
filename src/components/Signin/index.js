import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Icon from "../../assets/Chat.jsx"
const Signin = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <Icon/>
      <button onClick={signInWithGoogle}>Signin with google</button>
    </div>
  );
};

export default Signin;
