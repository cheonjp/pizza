import React, { useEffect, useState } from 'react'
import "./login.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link, useNavigate, } from 'react-router-dom'
import instance from '../../../axios'
import Input from '../../components/input/Input'
import SubmitBtn from '../../components/submitBtn/SubmitBtn'


function Login() {
    const [user,setUser]=useState({})
    const [message,setMessage]=useState("")
    const [notFound, setNotFound]=useState(false)
    const [notMatched, setNotMatched]=useState(false)

    const navigation = useNavigate()
    
    const [values,setValues]=useState({
        email:"",
        password:""
    })

    const emailMessage = notFound ? "This mail is found" : "This is not email pattern."
    const emailPattern = notFound ? "" : "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"

    const passwordError = notMatched ? "Password is not matched" : ""
    const passwordPattern = notMatched ? "" : null

    const inputs = [
        {
            id:1,
            name:"email",
            label:"Email",
            required:true,
            type:"text",
            // pattern:"[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
            pattern:emailPattern,
            errorMessage:emailMessage,
            
        },
        {
            id:2,
            name:"password",
            label:"Password",
            required:true,
            type:"password",
            pattern:passwordPattern,
            errorMessage:passwordError,
        },

    ]

    const onChange =(e)=>{
        setValues({...values, [e.target.name]:e.target.value})
        e.target.name === "email" && setNotFound(false)
        e.target.name === "password" && setNotMatched(false)
    }
    
    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            const res = await instance.post("/api/user/login",values)
            res && setUser(res.data)
            
        } catch (error) {
            console.log(error.response.data)
            if(error.response.status ===404){
                setNotFound(true)
            }
            if(error.response.status === 400){
                setNotMatched(true)
            }
        }
    }

    useEffect(()=>{
        if(user._id){
            sessionStorage.removeItem("user")
            sessionStorage.setItem("user",JSON.stringify(user))

            if(sessionStorage.getItem("user")){
                navigation("/")
            }
        }

    },[user])

    
  return (
    <div className='login'>
        <div className="left">
            <div className="container">
            <Link to="/"><IconLogo /></Link>
                <form onSubmit={handleLogin}>
                    {inputs.map(each=>{ 
                        return <Input key={each.id} {...each} value={each.value} onChange={onChange}/>
                    })}
                    <SubmitBtn text={"Login"}/>
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