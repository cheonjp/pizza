import React, { useContext } from 'react'
import {GrClose} from "react-icons/gr"
import "./closeBtn.scss"
import { ModalContext } from '../../../App'

function CloseBtn() {
    const [openModal,setOpenModal]=useContext(ModalContext)
  return (
    <GrClose className='close' onClick={()=>setOpenModal(false)}/>
  )
}

export default CloseBtn