import React, { useEffect, useRef, useState } from 'react'
import "./ItemDetail.scss"
import Select from '../../components/select/Select'
import { BsArrowRight } from "react-icons/bs"
import instance from '../../../axios'
import { useParams } from 'react-router-dom'

function ItemDetail() {
    const [sizeValue, setSizeValue] = useState(12)
    const [quantity, setQuantity] = useState("")
    const [item, setItem] = useState({})
    const [totalPrice,setTotalPrice]=useState(null)

    const totalPriceTag=useRef()


    const { id } = useParams()
    let inch = 10

    const options = {
        cat: "Size",
        optionArray: [12, 14, 16],
    }
    const selectValue = (event, value) => {
        setSizeValue(Number(event.target.value))
        if(event.target.value === 12){
            setTotalPrice(Number(item.price[0]) * quantity)
        }else if(event.target.value === 14){
            setTotalPrice(Number(item.price[1]) * quantity)
        }else{
            setTotalPrice(Number(item.price[2]) * quantity)
        }
    }

    useEffect(() => {
        quantity <= 1 && setQuantity(1)
        if(item.price){
            if(Array.isArray(item.price)){
                if(sizeValue === 12){
                    setTotalPrice(Number(item.price[0]) * quantity)
                }else if(sizeValue === 14){
                    setTotalPrice(Number(item.price[1]) * quantity)
                }else if(sizeValue === 16){
                    setTotalPrice(Number(item.price[2]) * quantity)
                }
            }else{
                setTotalPrice(quantity * item.price)
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

    useEffect(()=>{
        Array.isArray(item.price) ? setTotalPrice(Number(item.price[0])) : setTotalPrice(Number(item.price))
    },[item])

    const adjustNumber = (e) => {
        setQuantity(e.target.value)
    }

    const calculatedPrice = () =>{
        // console.log(totalPrice)
    }
    
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
                                {item.price.map((each, i) => <span>{inch += 2} inch : ${each}</span>)}
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
                                <span ref={totalPriceTag} className='price'>${totalPrice}</span>
                            </div>
                        </div>
                        <div className="btnContainer">
                            <button className='arrowIconBtn'><BsArrowRight />ADD TO CART</button>
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
        </div>
    )
}

export default ItemDetail