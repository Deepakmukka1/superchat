/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Chatmessage.css'

const ChatMessage = ({auth,data}) => {

    const {message,uid,photoURL}=data
    const classNames=(uid===auth.currentUser.uid?'my-message':'not-my-message')
    // console.log(uid,auth.currentUser.uid)

    return (
        <div className={classNames}>
            <p>{message}</p>
            <img src={photoURL} className='displayPic'/>

        </div>
    )
}

export default ChatMessage
