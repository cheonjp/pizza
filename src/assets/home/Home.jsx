import React, { useEffect, useRef, useState } from 'react'
import "./home.scss"
import { ReactComponent as IconLogo } from "../svg/logo_white.svg"
import { BsArrowRight } from "react-icons/bs"
import { todaySales } from '../data'

function Home() {

    const [slideClassName, setSlideClassName] = useState("iconLogo")
    const [text, setText] = useState("Best Pizza")
    const [menuAni, setMenuAni] = useState(false)
    const [arrangeData, setArrangeData] = useState([])
    const [saleMenuTarget,setSaleMenuTarget]=useState(0)


    setTimeout(() => setSlideClassName("iconLogo showActive"), 1000)

    const textTag = useRef()
    const section = useRef()

    useEffect(() => {
        let texts
        texts = text.split("")
        let entireText = ""
        texts.forEach(eachText => {
            entireText += `<span class="eachText">${eachText}</span>`
            textTag.current.innerHTML = entireText

        })
        setTimeout(()=>{
            textAnimation()
        },100)
    }, [])
    const textAnimation = ()=>{
        const displayTexts = document.querySelectorAll(".eachText")
        let timing = 1
        displayTexts.forEach((displayText) => {
            displayText.style.transitionDelay = `${timing}s`
            displayText.classList.add("active")
            timing += 0.1
        })
    }


    const showSection = (target) => {
        const elementPosition = target.current.getBoundingClientRect().top
        const browserHeight = window.innerHeight
        if (browserHeight - elementPosition > 0) {
            target.current.classList.add("showSection")
            setMenuAni(true)
        }
    }



    window.onscroll = () => {
        showSection(section)

    }
    useEffect(() => {
        let timing = 1000
        setToday()
        if (menuAni) {
            const items = document.querySelectorAll(".showSection .left .item")
            items.forEach((item,i) => {
                timing += 100
                setTimeout(() => {
                    item.classList.add(`activeAni-${i}`)
                }, timing)
            })
        }
    }, [menuAni])


    let array = []
    const setToday = () => {
        let i = new Date().getDay()
        todaySales.forEach(each => {
            if (i > 6) {
                i = i - 7
            }
            array.push(todaySales[i])
            i++
        })
        setArrangeData(array)
    }

    const showMenuDetail =(e)=>{
        const item = e.target.closest('.item')
        const itemIndex = item.dataset.index
        setSaleMenuTarget(itemIndex)
        let num
        array = []
        arrangeData.forEach((data,i)=>{
            const targetItem = document.getElementsByClassName("item")[i]
            num = i-itemIndex
            if(num < 0){
                num = arrangeData.length+num
            }
           
            targetItem.className=`item activeAni-${num}`
            
        })
    }

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
                                <p><span style={{ fontSize: "18px", color: "#eca86d" }}>MONSTER PIZZA</span> is here to cater your craving for Pizza. With Unlimited Free Toppings we strive to serve the best food and services to you. After the great success in Seoul, we will be serving in other parts of Seoul soon</p>
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
                <section ref={section} className='sale hideSection'>
                    <div className="container">
                        <h1 >Today's SALE</h1>
                        <div className="saleScreen">
                            <div className="left">
                                {arrangeData.map((data, i) => {
                                    return (
                                        <>
                                            <div className="item" onClick={showMenuDetail} data-index={i}>
                                                <h2>{i === 0 ? "Today" : data.day}</h2>
                                                <img src={`public/img/${data.img}`} alt="" />
                                            </div>

                                        </>

                                    )
                                })}
                            </div>
                            <div className="right">
                                <div className="container">
                                    {arrangeData.length !==0 && (
                                        <>
                                            <h2>{arrangeData[saleMenuTarget].item}</h2>
                                            <h3>{arrangeData[saleMenuTarget].menu}</h3>
                                            <p className='desc'>{arrangeData[saleMenuTarget].desc}</p>
                                            {arrangeData[saleMenuTarget].size && <p className='size'>Size: 16 inch</p>}
                                            <div className="priceAndButtonBox">
                                                <div className="priceBox">
                                                    <span className="price">${arrangeData[saleMenuTarget].discount}</span>
                                                    <span className="originalPrice">${arrangeData[saleMenuTarget].price}</span>
                                                </div>
                                                <button className='arrowIconBtn' disabled={saleMenuTarget===String(0) ? false : true}><BsArrowRight />Order</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home