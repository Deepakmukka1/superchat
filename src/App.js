import './App.css';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import Chatroom from './components/Chatroom';
import Signin from './components/Signin';

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyDdnLpgqWZfXpW6orfK8fYyDGJwUhb1jKg",
  authDomain: "chatapp-49fb9.firebaseapp.com",
  projectId: "chatapp-49fb9",
  storageBucket: "chatapp-49fb9.appspot.com",
  messagingSenderId: "391765343836",
  appId: "1:391765343836:web:bf824ddb0c27db5ecd7099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// console.log(auth)

const Signout=()=>{

 return auth.currentUser && (
   <button onClick={()=>auth.signOut()}>Signout</button>
 )

}

function App() {

  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user?<Chatroom/>:<Signin auth={auth}/>}
      <Signout/>
    </div>
  );
}

export default App;

