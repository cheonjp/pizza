import React, { useContext, useState } from 'react'
import "./modal.scss"
import { ModalContext } from '../../../App'

function Modal({children}) {
    const [openModal,setOpenModal]=useContext(ModalContext)
  const closeModal=(e)=>{
    if(e.target.className ==="modal"){
      setOpenModal(false)
    }
  }
  return (
    <>
    {openModal ? <div className='modal' onClick={closeModal}>{children}</div> : null }
    </>
      
     
  )
}

export default Modal