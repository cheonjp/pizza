import React, { useContext } from 'react'
import "./orderMethod.scss"
import {ReactComponent as MethodSVG} from "../../svg/orderMethod.svg"
import {ReactComponent as HaveAccount} from "../../svg/haveAccount.svg"
import {ReactComponent as AsCustomer} from "../../svg/asCustomer.svg"
import { ModalContext } from '../../../App'
import CloseBtn from '../closeBtn/CloseBtn'
import { Link } from 'react-router-dom'

function OrderMethod() {
    const [openModal,setOpenModal]=useContext(ModalContext)
  return (
    <div className='orderMethod'>
        <CloseBtn className="close"/>
        <div className="left">
            <h4>How would you like to order?</h4>
            <p>If you have an account, next time, you can order in easy step.</p>
            <MethodSVG className="mainSVG"/>
        </div>
        <div className="right">
            <Link to="/login" onClick={()=>setOpenModal(false)}>
            <div className="haveAccount">
                <div className="container">
                <HaveAccount/>
                <p>I have an account</p>
                </div>
            </div>
            </Link>
            <div className="customer">
                <div className="container">
                <AsCustomer/>
                <p>I want to order as customer</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderMethod