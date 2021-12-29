/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Navbar from '../Navbar'

const Chatroom = ({auth}) => {
    // console.log(auth)
    const {currentUser}=auth
    return (
        <div>
            <Navbar name={currentUser.displayName} imageURL={currentUser.photoURL} auth={auth}/>
            <p>Chatroom</p>
        </div>
    )
}

export default Chatroom
