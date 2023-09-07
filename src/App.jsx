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

export const UserContext = createContext()
export const ModalContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [openModal, setOpenModal] = useState(false)



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
          <RouterProvider router={router} />
        </ModalContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
