import React, { useEffect, useRef, useState } from 'react'
import "./input.scss"

function Input(props) {
    const {label,key,errorMessage,type,placeholder,...inputProps}=props
    const [focusing,setFocusing]=useState(false)
    const [labelMove,setLabelMove]=useState(false)

    const labelTag = useRef()
   
    const blur =(e) =>{
      console.log('tset')
        e.target.value === "" ? placeholder ? setLabelMove(true) : setLabelMove(false) : null
        setFocusing(true)
    }
    const focus = ()=>{
      // setFocusing(true)
      setLabelMove(true)
    }

    useEffect(()=>{
      if(placeholder){
        labelTag.current.classList.add("labelActive")
      }

    },[props])
  return (
    <div className='inputContainer'>
        <label ref={labelTag} className={labelMove ? "labelActive" : null}>{label}</label>
        <input 
        key={key} 
        type={type}
        {...inputProps}  
        className="input"
        onFocus={focus}
        onBlur={blur}
        placeholder={placeholder}
        focusing={focusing.toString()}
         />
         <span className='error'>{errorMessage}</span>
    </div>
  )
}

export default Input