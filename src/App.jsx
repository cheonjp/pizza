import { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Home from './assets/pages/home/Home'
import Header from './assets/components/header/Header'
import Footer from './assets/components/footer/Footer'
import Login from './assets/pages/login/Login'
import Register from './assets/pages/register/Register'
import Order from './assets/pages/order/Order'
import ProfileDetail from './assets/pages/profileDetail/ProfileDetail'
import ItemDetail from './assets/pages/itemDetail/ItemDetail'
import Cart from './assets/pages/cart/Cart'
import instance from './axios'

export const UserContext = createContext()
export const ModalContext = createContext()
export const CartItemContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const sessionItems = sessionStorage.getItem("cartItems") ? JSON.parse(sessionStorage.getItem("cartItems")) : null
  const [cartNumber, setCartNumber] = useState(sessionItems ? sessionItems.length : null)

  useEffect(() => {
    const getUserCartItems = async () => {
      try {
        if (user) {
          const userId = user._id
          if (sessionItems) {
            sessionItems.forEach(async (item) => {
              try {
                const test = await instance.post("/api/checkout/cart/" + user._id, { ...item, userId: user._id })
              } catch (error) {
                console.log(error)
              }
            })
            sessionStorage.removeItem("cartItems")
          }
          const res = await instance.get("/api/checkout/cart/all-items/" + userId)
          setCartNumber(res.data.length)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserCartItems()
  }, [user,cartNumber])

  // window.onscroll = () =>{
  //   console.log(cartNumber)
  // }

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/order",
          element: <Order />
        },
        {
          path: "/profile/:id",
          element: <ProfileDetail />
        },
        {
          path: "/order/:id",
          element: <ItemDetail />
        },
        {
          path: "/cart/:id",
          element: <Cart />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ])

  return (
    <div className='app'>
      <UserContext.Provider value={[user, setUser]}>
        <ModalContext.Provider value={[openModal, setOpenModal]}>
          <CartItemContext.Provider value={[cartNumber, setCartNumber]}>
            <RouterProvider router={router} />
          </CartItemContext.Provider>
        </ModalContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
