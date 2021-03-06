import "./App.css";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import Chatroom from "./components/Chatroom";
import Signin from "./components/Signin";

// Initialize Firebase

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG))

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
