import React from 'react'
import './Modal.css'

const Modal = ({modalContent}) => {
    return (
        <div className='modal'>
            {modalContent}
        </div>
    )
}

export default Modal
