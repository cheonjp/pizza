import React, { useState } from 'react'
import "./register.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import instance from '../../../axios'

function Register() {

    const [message,setMessage]=useState("")
    const navigation = useNavigate()

    const registerUser = async (e)=>{
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget)
            const values = Object.fromEntries(formData)
            if(values.password !== values.confirmPassword){
                setTimeout(()=> setMessage(""),3000)
               return setMessage("password is not matched!")
            }
            
            const formValue = [...formData.values()]
            if(formValue.includes("")){
                setTimeout(()=> setMessage(""),3000)
                return setMessage("Please fill the forms out")
            }
            const res = await instance.post("/api/user/register",values)
            setMessage(res.data)
            navigation("/login")
        } catch (error) {
            setTimeout(()=> setMessage(""),3000)
            setMessage(error.response.data)
        }
    }
    return (
        <div className='register'>
            <div className="left">
                <div className="container">
                    <IconLogo />
                    <form onSubmit={registerUser}>
                        <div className="formContainer">
                            <div className="leftForm">
                                <input type="text" placeholder='Email' name="email" className='input' />
                                <input type="text" placeholder='Name' name="username" className='input' />
                                <input type="password" placeholder='Password' name="password" className='input' />
                                <input type="password" placeholder='EmailConfirm Password' name="confirmPassword" className='input' />
                            </div>
                            <div className="rightForm">
                                <input type="text" placeholder='Country, City' name="city" className='input' />
                                <input type="text" placeholder='Address Detail' name="address" className='input' />
                                <input type="text" placeholder='Phone Number' name="phone" className='input' />
                                <input type="text" placeholder='Post Code' name="postCode" className='input' />
                            </div>
                        </div>
                        <button className='submit' type="submit">Sign up</button>
                        <div className="signUp">
                            <span>Have already an account?</span>
                            <Link to="/login">Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <img src="/public/img/register.jpg" alt="" />
            </div>
            {message ? <p className='alert'>{message}</p> : null}
            {console.log(message)}
        </div>
    )
}

export default Register