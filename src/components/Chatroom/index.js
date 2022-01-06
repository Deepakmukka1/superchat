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
import { getStorage, ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import './Chatroom.css'
import { useCollection } from "react-firebase-hooks/firestore";
import ChatMessage from "../Chatmessage";
import Modal from "../Modal";

const Chatroom = ({ auth, app }) => {

  const [isModalOpen,setIsModalOpen]=useState({content:'',state:false})
  const [message,setMessage]=useState('')
  const { currentUser } = auth;
  const db = getFirestore(app);
  const messageRef = collection(db, "messages");
  const qureyToBe = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages]=useCollection(qureyToBe)
  const messagesEndRef=useRef(null)
  const fileUploadRef=useRef(null)
  // const [url,setUrl]=useState(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // useEffect(()=>{
  //     console.log("Hello")
  // },[isModalOpen])

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      message: message,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
    });

    setMessage('')
  };

  const uploadImage=()=>{

    // const imageFile
    fileUploadRef.current?.click();

  }

  const handleImageUpload=(event)=>{

    const file=event.target.files[0];
    const storage = getStorage();
    // console.log(file)

// Create a reference to 'imagee.jpg'
const imageRefFirebase = ref(storage, file?.name || "Default.jpg" );

setIsModalOpen({...isModalOpen,state:true,content:'Uploading image'})

uploadBytesResumable(imageRefFirebase, file).then((snapshot) => {

  getDownloadURL(snapshot.ref).then(async(downloadURL) => {

    await addDoc(collection(db, "messages"), {
      message: downloadURL,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
    });
  }).catch((err)=>{
    console.log(err)
  });
  setIsModalOpen({...isModalOpen,state:false})
}).catch((err)=>{
  console.log("Upload error")
})

// setIsModalOpen(false)




  }

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
 <div className="main">
    <div>
      <Navbar
        name={currentUser.displayName}
        imageURL={currentUser.photoURL}
        auth={auth}
      />
    </div>
      <div>
      { isModalOpen.state && <Modal modalContent={isModalOpen.content}/>}
      <div className="see-chat">
    
        {messages && (
          <span>
            {messages.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <ChatMessage data={doc.data()} auth={auth}/>
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
        {/* <input type='file' className="btn"/>   */}
        <button onClick={uploadImage} className="btn">
         Upload
        </button>
        <input type='file' hidden ref={fileUploadRef} onChange={handleImageUpload} accept="image/png, image/gif, image/jpeg"/>
      </div>
    </div>
    </div>
  );
};

export default Chatroom;
