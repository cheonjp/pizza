import React, { useState } from 'react'
import "./input.scss"

function Input(props) {
    const {label,key,errorMessage,type,...inputProps}=props
    const [focusing,setFocusing]=useState(false)
    const [labelMove,setLabelMove]=useState(false)
   
    const blur =(e) =>{
        e.target.value === "" ? setLabelMove(false) : null
        setFocusing(true)
    }
  return (
    <div className='inputContainer'>
        <label className={labelMove ? "labelActive" : null}>{label}</label>
        <input 
        key={key} 
        type={type}
        {...inputProps}  
        className="input"
        onFocus={()=> setLabelMove(true)}
        onBlur={blur}
        focusing={focusing.toString()}
         />
         <span className='error'>{errorMessage}</span>
    </div>
  )
}

export default Input