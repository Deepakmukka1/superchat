import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Signin = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Signin with google</button>
    </div>
  );
};

export default Signin;
