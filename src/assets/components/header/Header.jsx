import React, { useState, useContext, useEffect, useRef } from 'react'
import "./header.scss"
import { ReactComponent as IconLogo } from "../../svg/logo.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import instance from '../../../axios'
import { CgProfile } from "react-icons/cg"
import { PiShoppingCartLight } from "react-icons/pi"
import { BiRegistered, BiMenu } from "react-icons/bi"
import { CartItemContext, ModalContext, ModalElementContext, UserContext } from '../../../App'
import Modal from '../modal/Modal'
import OrderMethod from '../orderMethod/OrderMethod'



function Header() {
    const [scrollActive, setScrollActive] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [openModal, setOpenModal] = useContext(ModalContext)
    const [openUserDropDown, setOpenUserDropDown] = useState(false)
    const [scrollTop,setScrollTop]=useState(0)

    const [cartNumber, setCartNumber] = useContext(CartItemContext)
    const [modalChild, setModalChild] = useContext(ModalElementContext)

    const navigate = useNavigate()
    const location = useLocation()

    const activeHeader = (e) => {        
        const scrollPosition = window.scrollY
 
        if (scrollPosition > scrollTop) {
            setScrollActive(true)
            // return window.removeEventListener("scroll", activeHeader)
        }else{
            setScrollActive(false)
        }
        setScrollTop(scrollPosition)
    }
    window.addEventListener("scroll", activeHeader)
    // window.addEventListener("scroll", () => {
    //     const scrollPosition = window.scrollY
        
    //     if (scrollPosition < 110) {
    //         setScrollActive(false)
    //         activeHeader()
    //     }
    // })

    useEffect(() => {
        if (sessionStorage.getItem("user") !== null) {
            if (!user) {
                const data = JSON.parse(sessionStorage.getItem("user"))
                setUser(data)
            }
        }
    }, [user])

    useEffect(() => {
        const profileDropDownHandler = (e) => {
            if (!e.target.closest(".userInfo")) {
                setOpenUserDropDown(false)
                return document.removeEventListener("mousedown", profileDropDownHandler)
            }
        }
        document.addEventListener("mousedown", profileDropDownHandler)
    }, [openUserDropDown])


    const logoutHandler = () => {
        sessionStorage.removeItem("user")
        navigate("/")
        window.location.reload()
    }

    const settingNavigation = (e) => {
        if (location.pathname === "/") {
            setOpenModal(true)
            setModalChild(<OrderMethod />)
        } else {
            navigate("/order")
        }
    }

    const activePhoneMenu = () => {
        setOpenModal(true)
        setModalChild(phoneMenu)
    }

    const phoneMenu = () => {
        return (
            <header className="phoneMenuContainer">
                <Link to="/" onClick={()=>setOpenModal(false)}>HOME</Link>
                {user ? <Link to="/order">ORDER</Link> : <div className='orderLink' onClick={settingNavigation}>ORDER</div>}
                <Link to="/" onClick={()=>setOpenModal(false)}>CONTACT</Link>
                <Link to="/" onClick={()=>setOpenModal(false)}>LOCATION</Link>
            </header>
        )
    }


    return (
        <>
            <header className={scrollActive ? "header active" : scrollTop=== 0 ? "header":"header blur"}>
                <div className="container">
                    <Link to="/">
                        <IconLogo className="logo" />
                    </Link>
                    <div className="center">
                        <Link to="/">HOME</Link>
                        {user ? <Link to="/order">ORDER</Link> : <div className='orderLink' onClick={settingNavigation}>ORDER</div>}
                        <Link to="/">CONTACT</Link>
                        <Link to="/">LOCATION</Link>
                    </div>
                    <div className="right">
                        {user ?
                            <div className='userInfo' onClick={() => setOpenUserDropDown(!openUserDropDown)}>
                                <span>Hi {user.username}</span>
                                <div className="profileImage">
                                    {<img src={!user.img ? instance.defaults.baseURL + "/images/profile/no_profile.png" : instance.defaults.baseURL + "/images/profile/" + user.img} alt="" />}
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
                        <Link to={user ? "/cart/" + user._id : "/cart/customer"}>
                            <div className="cart">
                                <PiShoppingCartLight />
                                {cartNumber > 0 && <div className="itemAlert">{cartNumber < 100 ? cartNumber : "99+"}</div>}
                            </div>
                        </Link>
                        <BiMenu className='phoneMenu' onClick={activePhoneMenu} />
                    </div>
                </div>
            </header>
                {openModal === true ?
                <Modal>
                    {modalChild}
                </Modal> :
                null
            }
        </>
    )
}

export default Header