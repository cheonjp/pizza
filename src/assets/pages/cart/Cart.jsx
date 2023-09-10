import React, { useContext, useEffect, useRef, useState } from 'react'
import "./cart.scss"
import { AiOutlineDelete } from "react-icons/ai"
// import Checkout, { ReactComponent as CheckoutSVG } from "../../svg/checkout.jsx"
import { CartItemContext, UserContext } from '../../../App'
import instance from '../../../axios'
import Checkout from '../../svg/checkout'
import { useLocation } from 'react-router-dom'

function Cart() {
    const [user, setUser] = useContext(UserContext)
    const [items, setItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)
    const [ani, setAni] = useState(false)
    const location = useLocation()

    const [cartNumber, setCartNumber] = useContext(CartItemContext)
    const totalPriceTag = useRef()
    let timing = 0
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await instance.get("/api/checkout/cart/all-items/" + user._id)
                setItems(res.data)
            } catch (error) {
                console.log(error.response)
            }
        }

        if (user) {
            getItems()
        } else if (sessionStorage.getItem("cartItems")) {
            setItems(JSON.parse(sessionStorage.getItem("cartItems")))
        }
    }, [])
    useEffect(() => {
        if (items) {
            setTotalPrice(items.reduce((acc, cur) => { return acc + cur.totalPrice }, 0))
            if (location.state === null) {
                setTimeout(() => {
                    setAni(true)
                }, 1000)
            }
            location.state = true
            setCartNumber(items.length)
        }
    }, [items])


    let array = []
    const deleteItem = (e) => {
        items.forEach((item, i) => {
            if (Number(e.target.id) !== i) {
                array.push(item)
            }
        })
        sessionStorage.removeItem("cartItems")
        sessionStorage.setItem("cartItems", JSON.stringify(array))
        const resetItems = JSON.parse(sessionStorage.getItem("cartItems"))
        setItems(resetItems)
    }
    const deleteAllItems = () => {
        sessionStorage.removeItem("cartItems")
        setItems(null)
        setCartNumber(0)
    }
    return (
        <div className='cart'>
            <div className="container">
                <div className="title">
                    <h1>My Cart</h1>
                </div>
                <div className="itemContainer">
                    <div className="left">
                        <h4>Item List</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th width="5%"><button className='arrowIconBtn' onClick={deleteAllItems}>Delete All</button></th>
                                    <th width="15%"></th>
                                    <th width="auto">Item</th>
                                    <th width="10%">Price</th>
                                    <th width="10%">Quantity</th>
                                    <th width="10%">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.map((item, i) => {
                                    timing += .1
                                    return (
                                        <tr key={i} className={ani ? "itemLine active" : location.state === true ? null : "itemLine"} style={{ transitionDelay: `${timing}s` }}>
                                            <td><AiOutlineDelete id={item._id ? item._id : i} onClick={deleteItem} /></td>
                                            <td><img src={item.img} alt="" /></td>
                                            <td>{item.name}</td>
                                            <td>$ {item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>$ {item.totalPrice}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="right">
                        <Checkout refer={totalPriceTag} classname={"checkoutBox"} totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart