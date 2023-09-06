import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ProfileDetail.scss"
import { useLocation, useParams } from 'react-router-dom'
import instance from '../../../axios'
import { BsArrowRight } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"
import SubmitSuccess from '../../components/submitSuccess/SubmitSuccess'
import { ModalContext } from '../../../App'
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import SubmitBtn from '../../components/submitBtn/SubmitBtn'


function ProfileDetail() {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [inputEdit, setInputEdit] = useState(false)
    const [token, setToken] = useState("")
    const [submit, setSubmit] = useState(false)
    const [profileImg, setProfileImg] = useState("")
    const [wrongPassword, setWrongPassword] = useState(false)
    const [nextStep, setNextStep] = useState(false)

    const profileImgTag = useRef()
    const [openModal, setOpenModal] = useContext(ModalContext)


    useEffect(() => {
        const getUser = async () => {
            if (id) {
                try {
                    const res = await instance.get(`/api/user/get/${id}`)
                    setUserInfo(res.data)
                    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"))
                    setToken(accessToken)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getUser()
    }, [id])


    const updateUser = async () => {
            try {
                const res = await instance.put("/api/user/update/" + id, userInfo, {
                    headers: {
                        Accept: "application/json",
                        Authorization: token
                    }
                })
                // setSubmit(true)
                sessionStorage.setItem("user", JSON.stringify(res.data))
                setSubmit(true)
                setTimeout(() => {
                    setSubmit(false)
                    window.location.reload()
                }, 2500)

            } catch (error) {
                console.log(error.response)
            }

    }

    const handleProfile = (e) => {
        e.preventDefault()
        setInputEdit(!inputEdit)
        inputEdit && updateUser()
    }

    const clearInput = (e) => {
        const input = e.currentTarget.previousElementSibling.previousElementSibling
        setUserInfo({ ...userInfo, [input.name]: "" })
    }

    const inputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const uploadImg = async (e) => {
        try {
            const formData = new FormData()
            formData.append("profile", e.target.files[0])
            const res = await instance.post("/api/image/upload", formData)
            setProfileImg(res.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if (profileImg !== "") {
            profileImgTag.current.src = instance.defaults.baseURL + "/images/profile/" + profileImg
            setUserInfo({ ...userInfo, img: profileImg })
        }
    }, [profileImg])

    const [value, setValue] = useState({})

    const flexibleWrongMessage = wrongPassword ? "Password is incorrect" : "Please fill this form out"
    const flexiblePattern = wrongPassword ? "other" : null
    const inputAttr = [
        {
            id: 1,
            name: "password",
            type: "password",
            required: "true",
            errorMessage: flexibleWrongMessage,
            pattern: flexiblePattern,
        },
    ]



    const newPasswordAttr = [
        {
            id: 1,
            name: "password",
            type: "password",
            required: "true",
            errorMessage: "at least 8 character, 1 upper and lower case.",
            pattern: "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
        },
        {
            id: 2,
            label: "confirm password",
            type: "password",
            required: "true",
            errorMessage: "Password is not matched with above one.",
            pattern: userInfo.password,
        },
    ]

    const submitCurrentPassword = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const value = Object.fromEntries(formData)
        try {
            await instance.post("/api/user/password/" + id, value)
            setNextStep(true)
        } catch (error) {
            if (error.response.status === 401) {
                setWrongPassword(true)
            } else {
                console.log(error.response)
            }
        }

    }
    const changeNewPasswordValue = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleNewPassword = async (e) => {
        e.preventDefault()
        try {
            const res = await instance.put("/api/user/update/" + id +"/password", userInfo, {
                headers: {
                    Accept: "application/json",
                    Authorization: token
                }

            })
            setSubmit(true)
            setTimeout(()=>{
                setSubmit(false)
                setOpenModal(false)
            },2500)
            
        } catch (error) {
            console.log(error.response)
        }
    }
    return (
        <div className='profileDetail'>
            <img src="/img/profileHero.jpg" alt="" className="heroImg" />
            <div className="container">
                <div className="nameAndImgContainer">
                    {/* <label className='profileImg'> */}
                    <label className={inputEdit ? "profileImg inputActive" : "profileImg"}>
                        <input type="file" name="img" onChange={uploadImg} />
                        <div className="imgContainer">
                            {/* <img className='profileImg' src={instance.defaults.baseURL + "/images/profile/no_profile.png"} alt="" /> */}
                            {userInfo &&
                                <img ref={profileImgTag} className='profileImg' src={!userInfo.img ? instance.defaults.baseURL + "/images/profile/no_profile.png" : instance.defaults.baseURL + "/images/profile/" + userInfo.img} alt="" />
                            }
                        </div>
                    </label>
                    <h2>{userInfo && userInfo.username}</h2>
                </div>
                <div className="inputContainer">
                    <form onSubmit={handleProfile}>
                        {userInfo &&
                            <>
                                <div className='inputBox'>
                                    <span>Email :</span>
                                    <input tabIndex="-1" type="text" name="email" value={userInfo.email} />
                                </div>
                                <div className='inputBox'>
                                    <span>Name :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabIndex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="username"
                                        value={userInfo.username}
                                        required
                                        pattern="[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+"

                                    />
                                    <div className='errorMessage'>number and special character not acceptable.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Phone :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabIndex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="phone"
                                        value={userInfo.phone}
                                        required
                                        pattern="[+ 0-9 ]+"
                                    />
                                    <div className='errorMessage'>Phone number must be only numbers</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Country and City :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabIndex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="city"
                                        value={userInfo.city}
                                        required
                                    />
                                    <div className='errorMessage'>Please fill the form in.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Address :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabIndex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="address"
                                        value={userInfo.address}
                                        required
                                    />
                                    <div className='errorMessage'>Please fill the form in.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Post Code :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabIndex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="postCode"
                                        value={userInfo.postCode}
                                        required
                                    />
                                    <div className='errorMessage'>Please fill the form in.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <button className='arrowIconBtn'><BsArrowRight />{inputEdit ? "Save Profile" : "Edit Profile"}</button>
                            </>
                        }

                    </form>
                    <button className='arrowIconBtn' onClick={() => { setOpenModal(true) }}><BsArrowRight />Change Password</button>
                </div>
            </div>
            {submit ? <SubmitSuccess text={"Profile is updated"} /> : null}
            <Modal>

                <div className='editPasswordContainer'>
                    <h5 className='title'>Change Password</h5>
                    {!nextStep ?
                        <form onSubmit={submitCurrentPassword}>
                            {inputAttr.map((input) => {
                                return <Input onChange={() => setWrongPassword(false)} key={input.id} label={"current " + input.name} {...input} />

                            })}
                            <SubmitBtn text={"Submit"} />
                        </form> :
                        <form onSubmit={handleNewPassword}>
                            {newPasswordAttr.map((input) => {
                                return <Input key={input.id} label={input.name} value={input.value} {...input} onChange={changeNewPasswordValue} />

                            })}
                            <SubmitBtn text={"Change Password"} />
                        </form>
                    }
                    {submit ? <SubmitSuccess text={"Password is updated"} /> : null}
                </div>
            </Modal>
        </div>
    )
}

export default ProfileDetail