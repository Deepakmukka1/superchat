/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Navbar.css'

const Signout = ({auth}) => {
    return (
      auth.currentUser && <button className='btn' onClick={() => auth.signOut()}>Signout</button>
    );
  };

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <div className='icon'>
             <h3> 💬 Chatroom</h3>
            </div>
             <div className='meta-data'>
            <img src={props.imageURL} />
            <h4>{props.name}</h4>
            <Signout auth={props.auth}/>
            </div>
        </div>
    )
}

export default Navbar
