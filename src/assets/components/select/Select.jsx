import React, { useRef, useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import "./select.scss"

const tests = ["test", "test2", "hello World"]
function Select() {
    const [openSelect, setOpenSelect] = useState(false)
    const [firstValue, setFirstValue] = useState("")

    const targetOption = useRef()

    const activeSelect = (e) => {
        setOpenSelect(!openSelect)
    }

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
        <div className='select' onClick={activeSelect}>
            <div className="selectContainer">
                <div className="title">Sort by</div>
                <div className="select"><span>{firstValue === "" ? tests[0] : firstValue}</span></div>
            </div>
            <div className={openSelect ? "optionContainer active" : "optionContainer"}>
                {
                    tests.map((option,index) => {
                        return (
                            <div className={index === 0 ? "optionBox selected" : "optionBox"} onClick={optionEvent}>
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