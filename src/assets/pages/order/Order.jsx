import React, { useEffect, useRef, useState } from 'react'
import "./order.scss"
import instance from '../../../axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Order() {
  const [items, setItems] = useState([])
  const [sortReady, setSortReady] = useState(false)
  const [sizes, setSizes] = useState([12, 14, 16])

  const [menu, setMenu] = useState("All")
  const [sort, setSort] = useState("A-Z")
  const [allMenu, setAllMenu] = useState([])
  const [sortedItems, setSortedItems] = useState([])

  const menuHandleChange = (e) => {
    setMenu(e.target.value)
  }
  const sortHandleChange = (e) => {
    setSort(e.target.value)
  }



  const viewByMenu = () => {
    if (menu === "All") {
      setItems(allMenu)
    }
    if (menu === "Appetizer") {
      const sort = allMenu.filter(item => item.cat === "Appetizer")
      setItems(sort)
    }
    if (menu === "Pizza") {
      const sort = allMenu.filter(item => item.cat === "Pizza")
      setItems(sort)

    }
    if (menu === "Combo") {
      const sort = allMenu.filter(item => item.cat === "Combo")
      setItems(sort)

    }
    if (menu === "Drink") {
      const sort = allMenu.filter(item => item.cat === "Drink")
      setItems(sort)

    }
    if (menu === "Pasta") {
      const sort = allMenu.filter(item => item.cat === "Pasta")
      setItems(sort)

    }
  }

  useEffect(() => {

    viewByMenu()
  }, [menu, sort,allMenu])

  useEffect(()=>{
    sortBy()
  },[items])

  const sortBy = () => {
    if (sort === "Price high to low") {
      const sortItem = items.sort((a, b) => {
        if (typeof (a.price) === "object") {
          a.price = a.price[0]
        }
        if (typeof (b.price) === "object") {
          b.price = b.price[0]
        }
        return Number(b.price) - Number(a.price)
      })
      setSortedItems(sortItem)
    }
    if (sort === "Price low to high") {
      const sortItem = items.sort((a, b) => {
        if (typeof (a.price) === "object") {
          a.price = a.price[0]
        }
        if (typeof (b.price) === "object") {
          b.price = b.price[0]
        }
        return Number(a.price) - Number(b.price)
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
              <div className="item">
                <img src={item.img} alt={item.name} />
                <h4 className='itemName'>{item.name}</h4>
                <p className='itemDesc'>{item.desc}</p>
                <div className="priceBox">
                  {typeof (item.price) === "object" && item.price.map((each, index) => {
                    return <span className='itemPrice'>{sizes[index]}inch $ {each}</span>
                  })}
                  {typeof (item.price) !== "object" && <span className='itemPrice'>$ {item.price}</span>}
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