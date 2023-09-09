import React from 'react'
import "./cart.scss"
import {AiOutlineDelete} from "react-icons/ai"
import {ReactComponent as CheckoutSVG} from "../../svg/checkout.svg"

function Cart() {
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
                <tr>
                    <th width="5%"></th>
                    <th width="15%"></th>
                    <th width="auto">Item</th>
                    <th width="10%">Price</th>
                    <th width="10%">Quantity</th>
                    <th width="10%">Subtotal</th>
                </tr>
                <tr>
                    <td><AiOutlineDelete/></td>
                    <td><img src="/img/baconPizza.png" alt="" /></td>
                    <td>Ultimate Pizza</td>
                    <td>$ 35</td>
                    <td><input type="number" value="1" /></td>
                    <td>$ 35</td>
                </tr>
                <tr>
                    <td><AiOutlineDelete/></td>
                    <td><img src="/img/baconPizza.png" alt="" /></td>
                    <td>Ultimate Pizza</td>
                    <td>$ 35</td>
                    <td><input type="number" value="1" /></td>
                    <td>$ 35</td>
                </tr>
            </table>
            </div>
            <div className="right">
            <CheckoutSVG/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Cart