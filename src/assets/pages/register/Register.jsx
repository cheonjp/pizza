import React, { useRef, useState } from 'react'
import "./register.scss"
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import instance from '../../../axios'
import Input from '../../components/input/Input'
import SubmitBtn from '../../components/submitBtn/SubmitBtn'

function Register() {

    const [sameEmail, setSameEmail] = useState(false)
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(null)

    const submitBtn = useRef()

    const emailErrorMessage = sameEmail ? "This email is already registered" : "This is not email pattern"
    const emailPattern = sameEmail ? "" : "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*"

    const [values, setValues] = useState(
        {
            username: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            city: "",
            postCode: "",
        },
    )


    const leftInputs = [

        {
            id: '1',
            name: "email",
            label: "Email",
            type: "text",
            // errorMessage: "This is not email pattern.",
            errorMessage: emailErrorMessage,
            required: true,
            // pattern: "[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*",
            pattern: emailPattern,
        },
        {
            id: '2',
            name: "username",
            label: "Name",
            type: "text",
            errorMessage: "number and special character not acceptable.",
            required: true,
            pattern: "[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+",

        },
        {
            id: '3',
            name: "password",
            label: "Password",
            type: "password",
            errorMessage: "at least 8 character, 1 upper and lower case.",
            required: true,
            pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        },
        {
            id: '4',
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            errorMessage: "Password is not matched.",
            required: true,
            pattern: values.password
        },

    ]
    const rightInputs = [

        {
            id: '5',
            name: "city",
            label: "Country, City",
            type: "text",
            errorMessage: "Please fill this in.",
            required: true
        },
        {
            id: '6',
            name: "address",
            label: "Address Detail",
            type: "text",
            errorMessage: "Please fill this in.",
            required: true
        },
        {
            id: '7',
            name: "phone",
            label: "Phone Number",
            type: "text",
            errorMessage: "Must be number.",
            required: true,
            pattern: "[+ 0-9 ]+",
        },
        {
            id: '8',
            name: "postCode",
            label: "Post Code",
            type: "text",
            errorMessage: "Please fill this in",
            required: true
        },

    ]
    const navigation = useNavigate()

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        sameEmail && setSameEmail(false)
    }


    const registerUser = async (e) => {
        e.preventDefault()
        submitBtn.current.classList.add("spinner")
        try {
            const res = await instance.post("/api/user/register", values)
            setData(res.data)
            res.data && submitBtn.current.classList.remove("spinner")
            

        } catch (error) {
            if (error.response.status === 401) {
                setSameEmail(true)
                submitBtn.current.classList.remove("spinner")
            }

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
                                {leftInputs.map(input => {
                                    return (
                                            <Input onChange={onChange} key={input.id} label={input.label} value={input.value} {...input} />
                                    )
                                }
                                )
                                }
                            </div>
                            <div className="rightForm">
                                {rightInputs.map(input => {
                                    return (
                                        <Input onChange={onChange} key={input.id} label={input.label} value={input.value} {...input} />
                                    )
                                }
                                )
                                }
                            </div>
                        </div>
                        <SubmitBtn text={"Sign up"} refer={submitBtn}/>
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
        </div>
    )
}

export default Register