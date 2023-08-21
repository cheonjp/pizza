import React from 'react'
import "./intro.scss"

function Intro({title,image,text}) {
    return (
        <div className="intro">
            <h2>{title}</h2>
            <div className="left">
                <div className={`${title.toLowerCase()} image`} ></div>
            </div>
            <div className="right">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Intro