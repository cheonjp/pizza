import React, { useEffect, useState } from 'react'
import "./order.scss"
import instance from '../../../axios'
import Select from '../../components/select/Select'

function Order() {
  const [items, setItems] = useState([])
  const [sizes, setSizes]=useState([12,14,16])
  const getAllItems = async () => {
    const res = await instance.get("/api/menu/get_all")
    setItems(res.data)
  }
  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <div className='order'>
      <section>
        <h1>Menu</h1>
        <div className="selectBox">
          <Select/>
        </div>
        <div className="container">

          {items.length > 0 && items.map((item,index) => {
            return (
              <div className="item">
                <img src={item.img} alt={item.name} />
                <h4 className='itemName'>{item.name}</h4>
                <p className='itemDesc'>{item.desc}</p>
                <div className="priceBox">
                  {typeof(item.price) === "object" && item.price.map((each,index)=>{
                    return <span className='itemPrice'>{sizes[index]}inch $ {each}</span>
                  })}
                  {typeof(item.price) !=="object" && <span className='itemPrice'>$ {item.price}</span>}
                </div>
              </div>
            )
          })}

        </div>
      </section>
    </div>
  )
}

export default Order