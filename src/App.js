import "./App.css";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import Chatroom from "./components/Chatroom";
import Signin from "./components/Signin";
import { firebaseConfig } from "./config/firebase";

// Import the functions you need from the SDKs you need

// Initialize Firebase

const app = process.env.NODE_ENV==="development"?initializeApp(firebaseConfig):initializeApp(JSON.parse(process.env.FIREBASE_CONFIG))

const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      { user ? <Chatroom auth={auth} app={app}/> : <Signin auth={auth} />}
      {/* <Signout /> */}
    </div>
  );
}

export default App;
