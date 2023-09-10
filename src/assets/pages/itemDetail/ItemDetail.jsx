import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ItemDetail.scss"
import Select from '../../components/select/Select'
import { BsArrowRight } from "react-icons/bs"
import instance from '../../../axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import { CartItemContext } from '../../../App'
import SubmitSuccess from '../../components/submitSuccess/SubmitSuccess'

function ItemDetail() {
    const [sizeValue, setSizeValue] = useState(12)
    const [quantity, setQuantity] = useState("")
    const [item, setItem] = useState({})
    const [totalPrice, setTotalPrice] = useState(null)
    const [cartItems, setCartItems] = useState(sessionStorage.getItem("cartItems") ?
        JSON.parse(sessionStorage.getItem("cartItems")) : [])
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")))
    const [render, setRender] = useState(false)

    const [cartNumber, setCartNumber] = useContext(CartItemContext)

    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = day[new Date().getDay()]

    const totalPriceTag = useRef()
    const location = useLocation()

    const { id } = useParams()
    let inch = 10

    const options = {
        cat: "Size",
        optionArray: [12, 14, 16],
    }
    const selectValue = (event, value) => {
        setSizeValue(Number(event.target.value))
        if (event.target.value === 12) {
            setTotalPrice(Number(item.price[0]) * quantity)
        } else if (event.target.value === 14) {
            setTotalPrice(Number(item.price[1]) * quantity)
        } else {
            setTotalPrice(item.day === today ? Number(item.salePrice) * quantity : Number(item.price[2]) * quantity)
        }
    }

    useEffect(() => {
        quantity <= 1 && setQuantity(1)
        if(item.day ===today){
            if (item.price) {
                if (Array.isArray(item.price)) {
                    if (sizeValue === 12) {
                        setTotalPrice(Number(item.price[0]) * quantity)
                    } else if (sizeValue === 14) {
                        setTotalPrice(Number(item.price[1]) * quantity)
                    } else if (sizeValue === 16) {
                        setTotalPrice(Number(item.salePrice) * quantity)
                    }
                } else {
                    setTotalPrice(quantity * item.salePrice)
                }
            }
        }else{
            if (item.price) {
                if (Array.isArray(item.price)) {
                    if (sizeValue === 12) {
                        setTotalPrice(Number(item.price[0]) * quantity)
                    } else if (sizeValue === 14) {
                        setTotalPrice(Number(item.price[1]) * quantity)
                    } else if (sizeValue === 16) {
                        setTotalPrice(Number(item.price[2]) * quantity)
                    }
                } else {
                    setTotalPrice(quantity * item.price)
                }
            }
        }

    }, [quantity])

    useEffect(() => {
        const getMenu = async () => {
            try {
                const res = await instance.get("/api/menu/get/" + id)
                setItem(res.data)

            } catch (error) {
                console.log(error.response)
            }
        }
        getMenu()
    }, [])

    useEffect(() => {
        if(item.day === today){
            Array.isArray(item.price) ? setTotalPrice(Number(item.price[0])) : setTotalPrice(Number(item.salePrice))
        }else{
            Array.isArray(item.price) ? setTotalPrice(Number(item.price[0])) : setTotalPrice(Number(item.price))
        }
    }, [item])

    const adjustNumber = (e) => {
        setQuantity(e.target.value)
    }
    let singleItem
    const handleItemList = () => {
        if (user) {
            singleItem = {
                img: item.img,
                name: item.name,
                size: sizeValue,
                price: totalPrice / quantity,
                quantity: quantity,
                totalPrice: totalPrice,
                userId: user._id
            }
            setCartItems(singleItem)
            setRender(true)
        } else {
            singleItem = {
                img: item.img,
                name: item.name,
                size: sizeValue,
                price: totalPrice / quantity,
                quantity: quantity,
                totalPrice: totalPrice,
            }
            setCartItems([...cartItems, singleItem])
            setRender(true)
        }
    }

    const savedItem = async () => {
        try {
            if (user) {
                await instance.post("/api/checkout/cart/" + user._id, cartItems)
                setCartNumber(cartNumber + 1)
                setRender(false)
            } else {
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems))
                setCartNumber(cartItems.length)
            }
        } catch (error) {
            console.log(error.response)
        }
        setRender(false)
    }
    useEffect(() => {
        if (render) {
            savedItem()
        }
    }, [render])

    return (
        <div className='itemDetail'>
            <div className="container" >
                <div className="left">
                    {item && <img src={item.img} alt="" />}
                </div>
                <div className="right">
                    <div className="container">
                        <div className="titleBox">
                            <h3>{item.name}</h3>
                        </div>
                        <div className="desc">{item.desc}</div>
                        {Array.isArray(item.price) &&
                            <div className="priceList">
                                {item.price.map((each, i) => <span key={i}>{inch += 2} inch : ${each}</span>)}
                            </div>
                        }
                        {item.size &&
                            <Select onchange={selectValue} values={options.optionArray} cat={options.cat} selectValue={sizeValue} />
                        }
                        <div className="totalPriceBox">
                            <div className="quantityBox">
                                <button className='increase' onClick={() => setQuantity(quantity - 1)}>-</button>
                                {/* <input type="number">{quantity}</input> */}
                                <input onChange={adjustNumber} type="number" min="1" value={quantity} />
                                <button className='decrease' onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <div className="totalPrice">
                                <span className='priceText'>Total Price</span>
                                {item.day === today && !Array.isArray(item.price) && <span className='originalPrice'>$ {item.price}</span>}
                                {item.day === today && Array.isArray(item.price) && sizeValue===16 &&<span className='originalPrice'>$ {item.price[2]}</span>}
                                <span ref={totalPriceTag} className='price'>${totalPrice}</span>
                            </div>
                        </div>
                        <div className="btnContainer">
                            <button onClick={handleItemList} className='arrowIconBtn'><BsArrowRight />ADD TO CART</button>
                            <button className='arrowIconBtn fill'><BsArrowRight />BUY NOW</button>
                        </div>
                    </div>
                </div>
                <div className="decoTextBox1">
                    FRESH
                </div>
                <div className="decoTextBox2">
                    CLASSIC
                </div>
            </div>
            {/* {success ? <SubmitSuccess text={"Item is added to cart"} /> : null} */}
        </div>
    )
}

export default ItemDetail