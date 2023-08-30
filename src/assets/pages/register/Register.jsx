import React, { useState } from 'react'
import "./register.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import instance from '../../../axios'

function Register() {

    const [message,setMessage]=useState("")
    const navigation = useNavigate()

    const messageTakeDown = setTimeout(()=>{
        setMessage("")
    },3000)

    const registerUser = async (e)=>{
        e.preventDefault()
        
        try {
            const formData = new FormData(e.currentTarget)
            const values = Object.fromEntries(formData)
            const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            if(!emailValidation.test(values.email)){
                messageTakeDown
                return setMessage("Please fill email in correctly")
            }
            const passwordValidation =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            if(!passwordValidation.test(values.password)){
                messageTakeDown
               return setMessage("Password must be minimum eight characters at least 1 letter and 1 number, 1 special character")
            }
            if(values.password !== values.confirmPassword){
                messageTakeDown
               return setMessage("password is not matched!")
            }
            
            const formValue = [...formData.values()]
            if(formValue.includes("")){
                messageTakeDown
                return setMessage("Please fill the forms out")
            }
            const phoneNumberValidation = /[0-9]/
            if(!phoneNumberValidation.test(Number(values.phone))){
                messageTakeDown
                return setMessage("Phone number must be written by only number")

            }
            const res = await instance.post("/api/user/register",values)
            setMessage(res.data)
            navigation("/login")
        } catch (error) {
            console.log(error)
            setTimeout(()=> setMessage(""),3000)
            setMessage(error.response.data)
        }
    }
    return (
        <div className='register'>
            <div className="left">
                <div className="container">
                    <Link to="/"><IconLogo /></Link>
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