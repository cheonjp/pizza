import React, { useRef } from 'react'
import "./SubmitSuccess.scss"
import { ReactComponent as Check } from '../../svg/check.svg'

function SubmitSuccess({text}) {
    const box =useRef()
    setTimeout(()=>{
        box.current.classList.add("active")
    },1000)
  return (
    <div ref={box} className="submitSuccess">
            <Check />
            <p>{text}</p>
    </div>
  )
}

export default SubmitSuccess