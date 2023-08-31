import React, { useState, useContext, useEffect } from 'react'
import "./header.scss"
import { ReactComponent as IconLogo } from "../../svg/logo.svg"
import { Link } from 'react-router-dom'
import instance from '../../../axios'
import { CgProfile } from "react-icons/cg"
import { PiShoppingCartLight } from "react-icons/pi"
import { BiRegistered } from "react-icons/bi"
import { UserContext } from '../../../App'


function Header() {
    const [scrollActive, setScrollActive] = useState(false)
    const [user, setUser] = useContext(UserContext)

    const activeHeader = () => {
        const scrollPosition = window.scrollY
        if (scrollPosition > 110) {
            setScrollActive(true)
            return window.removeEventListener("scroll", activeHeader)
        }
    }
    window.addEventListener("scroll", activeHeader)
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        if (scrollPosition < 110) {
            setScrollActive(false)
            activeHeader()
        }
    })


    useEffect(() => {
        if (sessionStorage.getItem("user") !== null) {
            if(!user){
                const data = JSON.parse(sessionStorage.getItem("user"))
                setUser(data)
            }
        }

    }, [])

    return (
        // <header className='header'>
        <header className={scrollActive ? "header active" : "header"}>
            <div className="container">
                <IconLogo className="logo" />
                <div className="center">
                    <Link to="/">HOME</Link>
                    <Link to="/">ORDER</Link>
                    <Link to="/">CONTACT</Link>
                    <Link to="/">LOCATION</Link>
                </div>
                <div className="right">
                    {user ?
                        <div className="profileImage">
                            <img src={instance.defaults.baseURL + "/images/profile/no_profile.png"} alt="" />
                        </div> :
                        <Link to="/login">
                            <div className="login">Login</div>
                        </Link>

                    }
                    <div className="cart">
                        <div className="itemAlert">4</div>
                        <PiShoppingCartLight />
                    </div>

                </div>
            </div>

        </header>
    )
}

export default Header