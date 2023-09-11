import React, { useRef } from 'react'
import "./SubmitSuccess.scss"
import { ReactComponent as Check } from '../../svg/check.svg'
import { GrClose } from "react-icons/gr"

function SubmitSuccess({ text }) {
  const box = useRef()
  setTimeout(() => {
    box.current.classList.add("active")
  }, 10)
  const close = () =>{
    box.current.classList.remove("active")
  }
  return (
    <div ref={box} className="submitSuccess">
      <div className="successContainer">
        <GrClose className='close' onClick={close}/>
        <Check />
        <p>{text}</p>
      </div>
    </div>
  )
}

export default SubmitSuccess