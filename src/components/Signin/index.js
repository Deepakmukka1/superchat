import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '../../assets/Googleicon.jsx'
import Icon from "../../assets/Chat.jsx"
import './Signin.css'
const Signin = ({ auth }) => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="signin">
      <div className="icon">
      <Icon />
      </div>
      <div>
      <h2>Welcome to group chat 🎉✨</h2>
      <button onClick={signInWithGoogle} className="btn" style={{display:'flex',width:'12rem',alignItems:'center',justifyContent:'center'}}><GoogleIcon/> Signin with google</button>
      </div>
    </div>
  );
};

export default Signin;
