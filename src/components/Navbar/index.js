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
            <img src={props.imageURL}/>
            <h4>{props.name}</h4>
            <Signout auth={props.auth}/>
        </div>
    )
}

export default Navbar
