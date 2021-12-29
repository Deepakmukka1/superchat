/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const Chatroom = ({auth}) => {
    console.log(auth)
    const {currentUser}=auth
    return (
        <div>
            <p>Chatroom</p>
            <h3>{currentUser.displayName}</h3>
            <img src={currentUser.photoURL} width="100" height="100"/>
        </div>
    )
}

export default Chatroom
