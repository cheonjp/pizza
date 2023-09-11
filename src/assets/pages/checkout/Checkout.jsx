import React, { useContext, useEffect, useState } from 'react'
import "./checkout.scss"
import Input from '../../components/input/Input'
import SubmitBtn from '../../components/submitBtn/SubmitBtn'
import SubmitSuccess from '../../components/submitSuccess/SubmitSuccess'
import { useNavigate } from 'react-router-dom'
import { CartItemContext, UserContext } from '../../../App'
import instance from '../../../axios'


function Checkout() {
    const [items, setItems] = useState(null)
    const [success, setSuccess] = useState(false)
    const [cartNumber, setCartNumber] = useContext(CartItemContext)
    const [user, setUser] = useContext(UserContext)
    const [totalPrice,setTotalPrice]=useState(0)

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postCode: "",
        cardholderName: "",
        cardNumber: "",
        exp: "",
        cvv: "",
        cartPostCode: ""
    })

    const [inputAttr, setInputAttr] = useState([
        {
            id: 1,
            label: "Name",
            type: "text",
            name: "name",
            required: true,
            pattern: "[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+",
            errorMessage: "number and special character not acceptable."
        },
        {
            id: 2,
            label: "Email",
            type: "text",
            name: "email",
            required: true,
            pattern: "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
            errorMessage: "This is not email pattern"
        },
        {
            id: 3,
            label: "Country, City",
            type: "text",
            name: "city",
            required: true,
            errorMessage: "Please fill this in.",

        },
        {
            id: 4,
            label: "Address",
            type: "text",
            name: "address",
            errorMessage: "Please fill this in.",
            required: true,
        },
        {
            id: 5,
            label: "Phone Number",
            type: "text",
            name: "phone",
            errorMessage: "Must be number.",
            required: true,
            pattern: "[+ 0-9 ]+",
        },
        {
            id: 6,
            label: "Post Code",
            type: "text",
            name: "postCode",
            errorMessage: "Please fill in.",
            required: true,
        },
        {
            id: 7,
            label: "Cardholder Name",
            placeholder: "Cardholder Name",
            type: "text",
            name: "cardholderName",
            pattern: "[a-zA-Z]+",
            required: true,
            errorMessage: "number and special character not acceptable."
        },
        {
            id: 8,
            label: "Card Number",
            placeholder: "1234 1234 1234 1234",
            type: "text",
            name: "cardNumber",
            errorMessage: "This is not card number pattern.",
            required: true,
            pattern: "[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}",
        },
        {
            id: 9,
            label: "Expiration",
            type: "text",
            name: "exp",
            placeholder: "MM/YY",
            errorMessage: "This is not expiration pattern",
            required: true,
            pattern: "(?:0[1-9]|1[0-2])/[0-9]{2}"
        },
        {
            id: 10,
            label: "CVV",
            type: "text",
            name: "cvv",
            errorMessage: "This is not CVV pattern",
            required: true,
            pattern: "[0-9][0-9][0-9]",
            placeholder: "123",
        },
        {
            id: 11,
            label: "Cardholder Post Code",
            placeholder: "Cardholder Post Code",
            type: "text",
            name: "cardholderPostCode",
            required: ""
        },
    ])



    const onchange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const displayItems = async () => {
        if (sessionStorage.getItem("cartItems")) {
            const items = JSON.parse(sessionStorage.getItem("cartItems"))
            setItems(items)
        } else if (user) {
            try {
                const res = await instance.get("/api/checkout/cart/all-items/" + user._id)
                setItems(res.data)
            } catch (error) {
                console.log(error.response)
            }
        }
    }

    useEffect(()=>{
        const displayPrice =()=> items.reduce((acc,cur)=>{
            return acc+cur.totalPrice
        },0)
        if(items){
            displayPrice()
            setTotalPrice(displayPrice)
        }
    },[items])

    useEffect(() => {
        displayItems()
    }, [])

    const handleCheckout = async (e) => {
        e.preventDefault()
        if (sessionStorage.getItem("cartItems")) {
            sessionStorage.removeItem("cartItems")
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate("/")
                setCartNumber(0)
            }, 3000)
        } else if (user) {
            try {
                await instance.delete("api/checkout/cart/delete/all-items", {
                    data: {
                        userId: user._id
                    }
                })
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    navigate("/")
                    setCartNumber(0)
                }, 3000)
            } catch (error) {
                console.log(error.response)
            }
        }
    }

    return (
        <div className='checkout'>
            <div className="container">
                <div className="left">
                    <h4>Customer Information</h4>
                    <div className="paymentContainer">
                        <form onSubmit={handleCheckout}>
                            <div className="customerInfoBox">
                                {inputAttr.map((each, i) => {
                                    const { id, name, ...other } = each
                                    return (
                                        i < 6 && <div className="inputBox">
                                            <Input key={each.id} name={each.name} {...other} onChange={onchange} />
                                        </div>
                                    )
                                })}
                            </div>
                            <h4>Payment Information</h4>
                            <div className="paymentInfoBox">
                                {inputAttr.map((each, i) => {
                                    const { id, ...other } = each
                                    return (
                                        i >= 6 && i < 8 && <div className={`inputBox`}>
                                            <Input key={each.id} {...other} onChange={onchange} />
                                        </div>
                                    )
                                })}
                                <div className="expCVVBox">
                                    {inputAttr.map((each, i) => {
                                        const { id, ...other } = each
                                        return (
                                            i >= 8 && i < 10 && <div className={"inputBox smallSize"}>
                                                <Input key={each.id} {...other} onChange={onchange} />
                                            </div>
                                        )
                                    })}
                                </div>
                                {inputAttr.map((each, i) => {
                                    const { id, ...other } = each
                                    return (
                                        i >= 10 && <div className={"inputBox"}>
                                            <Input key={each.id} {...other} onChange={onchange} />
                                        </div>
                                    )
                                })}
                            </div>
                            <SubmitBtn text={"Checkout"} />
                            <p>Don't worry. This project will not charge for the purchase, and your payment information will not save in the database.</p>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <h4>Payment Information</h4>
                    <div className="paymentContainer">
                        <div className="itemList">
                            <table className="item" width="100%">
                                <thead>
                                    <tr>
                                        <th width="15%"></th>
                                        <th width="auto"></th>
                                        <th width="15%"></th>
                                        <th width="15%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items && items.map((item, i) => {
                                        return (
                                            <tr>
                                                <td><img src="/img/baconPizza.png" alt="" /></td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.totalPrice}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="totalPriceBox">
                            <div className="totalPriceText">Total</div>
                            <div className="totalPrice">$ {totalPrice}</div>
                        </div>
                    </div>
                </div>
            </div>
            {success && <SubmitSuccess text={"Thank you. your items are checked out (Don't worry. This is not real checking out.)"} />}
        </div >
    )
}

export default Checkout