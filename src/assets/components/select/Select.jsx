import React, { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import "./select.scss"

// function Select({textTitle,optionArray,refer,targetFunction}) {
function Select(props) {
    const {textTitle,optionArray,refer}=props
    const [openSelect, setOpenSelect] = useState(false)
    const [firstValue, setFirstValue] = useState("")


    const activeSelect = (e) => {
        setOpenSelect(!openSelect)
    }

    useEffect(()=>{

    },[firstValue])
    
    const optionEvent = (e) => {
        const parent = e.target.parentElement.parentElement
        const options = parent.querySelectorAll(".optionBox")
        options.forEach((option)=>{
            option.classList.remove('selected')
        })
        setFirstValue(e.target.textContent)
        
        e.currentTarget.classList.add("selected")
    }
    window.onclick = (e) => {
        e.target.closest(".select") || setOpenSelect(false)

    }
    
    return (
        <div className='select' >
            <div className="selectContainer">
                <div className="title">{textTitle}</div>
                <div className="select"><span value ={firstValue} ref={refer}>{firstValue === "" ? optionArray[0] : firstValue}</span></div>
            </div>
            <div className={openSelect ? "optionContainer active" : "optionContainer"}>
                {
                    optionArray.map((option,index) => {
                        return (
                            <div key={index} className={index === 0 ? "optionBox selected" : "optionBox"} onClick={optionEvent}>
                                <div className="option" value={option}>{option}</div>
                            </div>
                        )
                    })
                }
            </div>
            <BsChevronDown className={openSelect ? "arrow active" : "arrow"} />
        </div>
    )
}

export default Select