import React, { useEffect, useRef, useState } from 'react'
import "./home.scss"
import { ReactComponent as IconLogo } from "../svg/logo_white.svg"

function Home() {

    const [slideClassName, setSlideClassName] = useState("iconLogo")
    const [text,setText]=useState("Best Pizza")
    setTimeout(() => setSlideClassName("iconLogo showActive"), 1000)

    const textTag = useRef()

    useEffect(()=>{
        let texts
        texts = text.split("")
        let entireText =""
        texts.forEach(eachText=>{
            entireText+=`<span class="eachText">${eachText}</span>`
            textTag.current.innerHTML = entireText
        })
    },[])
    const displayTexts =document.querySelectorAll(".eachText")
    let timing=0
    displayTexts.forEach((displayText)=>{
        console.log(displayText)
        displayText.style.transitionDelay=`${timing}s`
        displayText.classList.add("active")
        timing+=0.1

    })


    return (
        <div className='home'>
            <div className="container">
                <section className="heroSection">
                    <img src="../img/hero_pizza.jpg" alt="" />
                    <div className="heroContainer">
                        <div className="container">
                            <div className="left">
                                <div className="hide">
                                    <IconLogo className={slideClassName} />
                                </div>
                                <p><span style={{fontSize:"18px", color:"#eca86d"}}>MONSTER PIZZA</span> is here to cater your craving for Pizza. With Unlimited Free Toppings we strive to serve the best food and services to you. After the great success in Seoul, we will be serving in other parts of Seoul soon</p>
                            </div>
                            <div className="right">
                                <div className="textContainer">
                                    <p className="top" ref={textTag}></p>
                                    <hr />
                                    <p className="bottom">BEST QUALITY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='sale'>
                    <div className="container">
                    <h1>Today's SALE</h1>
                    .
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home