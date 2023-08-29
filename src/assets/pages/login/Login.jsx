import React from 'react'
import "./login.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link } from 'react-router-dom'


function Login() {
  return (
    <div className='login'>
        <div className="left">
            <div className="container">
                <IconLogo/>
                <form >
                    <input type="text" placeholder='Email' className='input' />
                    <input type="password" placeholder='Password'  className='input'/>
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