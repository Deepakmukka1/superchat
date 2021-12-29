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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// console.log(auth)

const Signout = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Signout</button>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      { user ? <Chatroom auth={auth}/> : <Signin auth={auth} />}
      <Signout />
    </div>
  );
}

export default App;
