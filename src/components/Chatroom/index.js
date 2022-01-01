/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  getFirestore,
  collection,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Chatroom = ({ auth, app }) => {

  const { currentUser } = auth;
  const db = getFirestore(app);
  const messageRef = collection(db, "messages");
  const qureyToBe = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages]=useCollection(qureyToBe)
  
  const wirteData = async () => {
    await addDoc(collection(db, "messages"), {
      message: "new-message-4",
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
    });

    // console.log(docRef.id);
  };

  return (
    <div>
      <Navbar
        name={currentUser.displayName}
        imageURL={currentUser.photoURL}
        auth={auth}
      />
      <h3>Chatroom</h3>
   
        {messages && (
          <span>
            {messages.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <p>{doc.data().message}</p>
              </React.Fragment>
            ))}
          </span>
        )}
        {/* {messages && messages.length} */}
   
      <button onClick={wirteData}>Write</button>
    </div>
  );
};

export default Chatroom;
