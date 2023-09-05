import React, { useState, useContext, useEffect } from 'react'
import "./header.scss"
import { ReactComponent as IconLogo } from "../../svg/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../../axios'
import { CgProfile } from "react-icons/cg"
import { PiShoppingCartLight } from "react-icons/pi"
import { BiRegistered } from "react-icons/bi"
import { ModalContext, UserContext } from '../../../App'


function Header() {
    const [scrollActive, setScrollActive] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [openModal, setOpenModal] = useContext(ModalContext)
    const [openUserDropDown, setOpenUserDropDown] = useState(false)

    const navigate = useNavigate()


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
            if (!user) {
                const data = JSON.parse(sessionStorage.getItem("user"))
                setUser(data)
            }
        }

    }, [])



    useEffect(()=>{
        const profileDropDownHandler = (e)=>{
            if(!e.target.closest(".userInfo")){
                setOpenUserDropDown(false)
                return document.removeEventListener("mousedown", profileDropDownHandler)
            }
        }
        document.addEventListener("mousedown", profileDropDownHandler)
    },[openUserDropDown])
        
    const logoutHandler = () =>{
        sessionStorage.removeItem("user")
        navigate("/")
        window.location.reload()
    }

    return (
        <header className={scrollActive ? "header active" : "header"}>
            <div className="container">
                <Link to="/">
                    <IconLogo className="logo" />
                </Link>
                <div className="center">
                    <Link to="/">HOME</Link>
                    {user ? <Link to="/order">ORDER</Link> : <Link onClick={() => setOpenModal(true)} to="#">ORDER</Link>}
                    <Link to="/">CONTACT</Link>
                    <Link to="/">LOCATION</Link>
                </div>
                <div className="right">
                    {user ?
                        <div className='userInfo'  onClick={()=>setOpenUserDropDown(!openUserDropDown)}>
                            <span>Hi {user.username}</span>
                            <div className="profileImage">
                                <img src={instance.defaults.baseURL + "/images/profile/no_profile.png"} alt="" />
                            </div>
                            {openUserDropDown &&
                                <ul className="profileDropDown">
                                    <Link to={`/profile/${user._id}`}><li>User Information</li></Link>
                                    <li onClick={logoutHandler}>Logout</li>
                                </ul>}
                        </div>
                        :
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