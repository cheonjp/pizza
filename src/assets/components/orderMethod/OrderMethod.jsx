import React, { useContext } from 'react'
import "./orderMethod.scss"
import { ReactComponent as MethodSVG } from "../../svg/orderMethod.svg"
import { ReactComponent as HaveAccount } from "../../svg/haveAccount.svg"
import { ReactComponent as AsCustomer } from "../../svg/asCustomer.svg"
import { ModalContext } from '../../../App'
import CloseBtn from '../closeBtn/CloseBtn'
import { Link, useLocation, useNavigate, } from 'react-router-dom'

function OrderMethod() {
    const [openModal, setOpenModal] = useContext(ModalContext)
    const navigate = useNavigate()
    const data = {
        navigation: "/order"
    }
    const toWardLogin = () => {
        setOpenModal(false)
        navigate("/login", { state: data })
    }
    return (
        <div className='orderMethod'>
            <CloseBtn className="close" />
            <div className="left">
                <h4>How would you like to order?</h4>
                <p>If you have an account, next time, you can order in easy step.</p>
                <MethodSVG className="mainSVG" />
            </div>
            <div className="right">
                <div className="haveAccount" onClick={toWardLogin}>
                    <div className="container">
                        <HaveAccount />
                        <p>I have an account</p>
                    </div>
                </div>
                <Link to="order" onClick = {()=> setOpenModal(false)}>
                    <div className="customer">
                        <div className="container">
                            <AsCustomer />
                            <p>I want to order as customer</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OrderMethod