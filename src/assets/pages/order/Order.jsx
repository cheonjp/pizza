import React, { useEffect, useRef, useState } from 'react'
import "./order.scss"
import instance from '../../../axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';


function Order() {
  const [items, setItems] = useState([])
  const [sortReady, setSortReady] = useState(false)
  const [sizes, setSizes] = useState([12, 14, 16])

  const [menu, setMenu] = useState("All")
  const [sort, setSort] = useState("A-Z")
  const [allMenu, setAllMenu] = useState([])
  const [sortedItems, setSortedItems] = useState([])

  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = day[new Date().getDay()]

  const menuHandleChange = (e) => {
    setMenu(e.target.value)
  }
  const sortHandleChange = (e) => {
    setSort(e.target.value)
  }


  const viewByMenu = () => {
    if (menu === "All") {
      const sort = allMenu.filter(item => item.cat !== "other")
      setItems(sort)

    }
    if (menu !== "All") {
      const sort = allMenu.filter(item => item.cat === menu)
      setItems(sort)

    }
  }

  useEffect(() => {
    viewByMenu()
  }, [menu, sort, allMenu])

  useEffect(() => {
    sortBy()

  }, [items, allMenu])



  const sortBy = () => {
    if (sort === "Price high to low") {
      const sortItem = items.sort((a, b) => {
        let numberA = typeof (a.price) === "object" ? Number(a.price[0]) : Number(a.price)
        let numberB = typeof (b.price) === "object" ? Number(b.price[0]) : Number(b.price)

        return numberB - numberA
      })
      setSortedItems(sortItem)
    }
    if (sort === "Price low to high") {
      const sortItem = items.sort((a, b) => {
        let numberA = typeof (a.price) === "object" ? Number(a.price[0]) : Number(a.price)
        let numberB = typeof (b.price) === "object" ? Number(b.price[0]) : Number(b.price)

        return numberA - numberB
      })
      setSortedItems(sortItem)
    }
    if (sort === "A-Z") {
      const sortItem = items.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      })
      setSortedItems(sortItem)
    }
    if (sort === "Z-A") {
      const sortItem = items.sort((a, b) => {
        if (a.name > b.name) {
          return -1
        }
        if (b.name > a.name) {
          return 1
        }
        return 0
      })
      setSortedItems(sortItem)
    }
  }




  const getAllItems = async () => {
    const res = await instance.get("/api/menu/get_all")
    setAllMenu(res.data)
    setItems(res.data)

  }
  useEffect(() => {
    getAllItems()
    setSortReady(true)
  }, [])


  return (
    <div className='order'>
      <section>
        <h1>Menu</h1>
        <div className="selectBoxContainer">
          <FormControl sx={{ m: 1, width: 130 }} size="small">
            <InputLabel id="demo-select-small-label">Menus</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={menu}
              label="Menus"
              onChange={menuHandleChange}
            >

              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
              <MenuItem value={"Pizza"}>Pizza</MenuItem>
              <MenuItem value={"Pasta"}>Pasta</MenuItem>
              <MenuItem value={"Combo"}>Combo</MenuItem>
              <MenuItem value={"Drink"}>Drink</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 200 }} size="small">
            <InputLabel id="demo-select-small-label">Sort by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sort}
              label="Sort by"
              onChange={sortHandleChange}
            >

              <MenuItem value={"A-Z"}>A-Z</MenuItem>
              <MenuItem value={"Z-A"}>Z-A</MenuItem>
              <MenuItem value={"Price high to low"}>Price high to low</MenuItem>
              <MenuItem value={"Price low to high"}>Price low to high</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className="container">
          {allMenu.length > 0 && sortedItems.map((item, index) => {
            return (
              <Link to={`/order/${item._id}`}>
                <div id={item._id} className="item" key={index}>
                  <img src={item.img} alt={item.name} />
                  <h4 className='itemName'>{item.name}</h4>
                  <p className='itemDesc'>{item.desc}</p>
                  <div className="priceBox">
                    {typeof (item.price) === "object" && item.price.map((each, index) => {
                      return item.day !== today ? <span className='itemPrice' key={index}>{sizes[index]} inch $ {each}</span>
                        : index === 2 ? <span className='itemPrice lineThrough' key={index}>{sizes[index]} inch $ {each}</span>
                          : <span className='itemPrice' key={index}>{sizes[index]} inch $ {each}</span>
                    })}
                    {typeof (item.price) !== "object" && item.day !== today && <span className='itemPrice'>$ {item.price}</span>}
                    {typeof (item.price) !== "object" && item.day === today && <span className='itemPrice lineThrough'>$ {item.price}</span>}

                  </div>
                  {item.day === today && <div className="todayDiscount">
                    <div className="discountContainer">
                      <p className="textBox sale">On sale</p>
                      {item.cat === "Pizza" && <p className="textBox size">16 inch</p>}
                      <p className="textBox price">$ {item.salePrice}</p>
                    </div>
                  </div>}
                </div>
              </Link>
            )
          })}

        </div>
      </section>
    </div>
  )
}

export default Order
