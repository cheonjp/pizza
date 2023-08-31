import React, { useState } from 'react'
import "./submitBtn.scss"
import {ImSpinner8} from "react-icons/im"

function SubmitBtn({text,refer}) {
  return (   
        <button ref={refer} className='submit' type="submit">{text} <ImSpinner8/></button> 
  )
}

export default SubmitBtn