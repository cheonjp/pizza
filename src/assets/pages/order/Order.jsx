import React, { useEffect, useState } from 'react'
import "./order.scss"
import instance from '../../../axios'

function Order() {
  const [items, setItems] = useState([])
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
        <div className="selectBox"></div>
        <div className="container">
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
          <div className="item">
            <img src="/img/baconPizza.png" alt="" />
            <h4 className='itemName'>Unlimited Pizza</h4>
            <p className='itemDesc'>Pepperoni, Ham, Beef, Mushrooms, Onions, Green Peppers, Olives, and Italian Sausage</p>
            <div className="priceBox">
              <span className='itemPrice'>12 inch: $20</span>
              <span className='itemPrice'>14 inch: $20</span>
              <span className='itemPrice'>16 inch: $20</span>
            </div>
          </div>
       

        </div>
      </section>
    </div>
  )
}

export default Order