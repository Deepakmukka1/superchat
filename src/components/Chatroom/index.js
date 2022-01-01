/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
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
import './Chatroom.css'
import { useCollection } from "react-firebase-hooks/firestore";

const Chatroom = ({ auth, app }) => {

  const [message,setMessage]=useState('')
  const { currentUser } = auth;
  const db = getFirestore(app);
  const messageRef = collection(db, "messages");
  const qureyToBe = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages]=useCollection(qureyToBe)
  const messagesEndRef=useRef(null)
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      message: message,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
    });

    setMessage('')
  };

  const changeMessage = (e) => {
    
    e.preventDefault();

    const message = e.target.value;
    setMessage(message);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
 <div>
    <div>
      <Navbar
        name={currentUser.displayName}
        imageURL={currentUser.photoURL}
        auth={auth}
      />
    </div>
      <div className="main">
      <div className="see-chat">
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

<div ref={messagesEndRef} />
</div>

<div className="msg-send">
        <input
          type="text"
          onChange={(e) => {
            changeMessage(e);
          }}
          className="msg-input"
          placeholder="Type a message..."
          value={message}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} className="btn">
          Send
        </button>
      </div>
        {/* {messages && messages.length} */}
   
      {/* <button onClick={sendMessage}>Write</button> */}
    </div>
    </div>
  );
};

export default Chatroom;
