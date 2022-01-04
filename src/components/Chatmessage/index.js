/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-useless-escape */
import React from 'react'
import './Chatmessage.css'

const ChatMessage = ({auth,data}) => {

    const {message,uid,photoURL}=data
    const classNames=(uid===auth.currentUser.uid?'my-message':'not-my-message')
    // console.log(uid,auth.currentUser.uid)


    function isValidUrl(_string){
        const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
        return matchPattern.test(_string);
      }
    


    return (
        <div className={classNames}>
            {isValidUrl(message)?<img src={message} width="300" height="200" style={{marginBottom:'20px',objectFit:"contain"}}/>:<p>{message}</p>}
            <img src={photoURL} className='displayPic'/>

        </div>
    )
}

export default ChatMessage
