import React, { useState } from 'react'
import "./login.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link } from 'react-router-dom'
import instance from '../../../axios'
import Input from '../../components/input/Input'


function Login() {
    const [user,setUser]=useState(null)
    const [message,setMessage]=useState("")
    
    const [values,setValues]=useState({
        email:"",
        password:""
    })

    const inputs = [
        {
            id:1,
            name:"email",
            label:"Email",
            required:true,
            type:"text",
            pattern:"[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
            errorMessage:"This is not email pattern.",
            
        },
        {
            id:2,
            name:"password",
            label:"Password",
            required:true,
            type:"password",
        },

    ]

    const onChange =(e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }
  return (
    <div className='login'>
        <div className="left">
            <div className="container">
            <Link to="/"><IconLogo /></Link>
                <form>
                    {/* <input type="text" placeholder='Email' name="email" className='input' />
                    <input type="password" placeholder='Password' name="password"  className='input'/> */}
                    {inputs.map(each=>{ 
                        // return <Input key={each.id} {...each} value={values[inputs.name]}  onChange={onChange}/>
                        return <Input key={each.id} {...each} value={each.value}  onChange={onChange}/>
                    })}
                    <button type="submit" className='submit'>Login</button>
                    <Link to="/register">Forget password?</Link>
                    <div className="signUp">
                        <span>Are you new here?</span>
                        <Link to="/register">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
        <div className="right">
            <img src="/public/img/login.jpg" alt="" />
        </div>
    </div>
  )
}

export default Login