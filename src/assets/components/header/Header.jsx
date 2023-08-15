import React, { useState } from 'react'
import "./header.scss"
import { ReactComponent as IconLogo } from "../../svg/logo.svg"
import { Link } from 'react-router-dom'

import { CgProfile } from "react-icons/cg"
import { BiRegistered } from "react-icons/bi"

function Header() {

    const [scrollActive, setScrollActive] = useState(false)


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
                    <div className="icon first"><CgProfile />Log in</div>
                    <div className="icon"><BiRegistered />Sign up</div>
                </div>
            </div>

        </header>
    )
}

export default Header