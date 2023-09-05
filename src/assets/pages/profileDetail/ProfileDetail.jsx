import React, { useEffect, useState } from 'react'
import "./ProfileDetail.scss"
import { useParams } from 'react-router-dom'
import instance from '../../../axios'
import { BsArrowRight } from "react-icons/bs"
import { IoMdCloseCircleOutline } from "react-icons/io"


function ProfileDetail() {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [inputEdit, setInputEdit] = useState(false)
    const [token, setToken] = useState("")

    useEffect(() => {
        const getUser = async () => {
            if (id) {
                try {
                    const res = await instance.get(`/api/user/get/${id}`)
                    setUserInfo(res.data)
                    const user = JSON.parse(sessionStorage.getItem("user"))
                    setToken(user.accessToken)

                } catch (error) {
                    console.log(error)
                }
            }
        }
        getUser()
    }, [id])

    const updateUser = async () => {
        if (inputEdit) {
            try {
                await instance.put("/api/user/update/" + id, userInfo, {
                    headers: {
                        Accept: "application/json",
                        Authorization: token
                    }
                })
            } catch (error) {
                console.log(error.response)
            }

        }
    }

    const handleProfile = (e) => {

        e.preventDefault()
        setInputEdit(!inputEdit)
        updateUser()

    }

    const clearInput = (e) => {
        const input = e.currentTarget.previousElementSibling.previousElementSibling
        setUserInfo({ ...userInfo, [input.name]: "" })
    }

    const inputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })

    }

    return (
        <div className='profileDetail'>
            <img src="/img/profileHero.jpg" alt="" className="heroImg" />
            <div className="container">
                <div className="nameAndImgContainer">
                    <label className='profileImg'>
                        <input type="file" />
                        <div className="imgContainer">
                            <img src={instance.defaults.baseURL + "/images/profile/no_profile.png"} alt="" />
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
                                    <input tabindex="-1" type="text" name="email" value={userInfo.email} />
                                </div>
                                <div className='inputBox'>
                                    <span>Name :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabindex={inputEdit ? "0" : "-1"}
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
                                        tabindex={inputEdit ? "0" : "-1"}
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
                                    <span>Address :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabindex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="address"
                                        value={userInfo.address}
                                        required
                                    />
                                    <div className='errorMessage'>Please fill the form in.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Country and City :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabindex={inputEdit ? "0" : "-1"}
                                        type="text"
                                        name="city"
                                        value={userInfo.city}
                                        required
                                    />
                                    <div className='errorMessage'>Please fill the form in.</div>
                                    {inputEdit ? <IoMdCloseCircleOutline onClick={clearInput} /> : null}
                                </div>
                                <div className='inputBox'>
                                    <span>Post Code :</span>
                                    <input onChange={inputChange}
                                        className={inputEdit ? "inputActive" : null}
                                        tabindex={inputEdit ? "0" : "-1"}
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
                    <button className='arrowIconBtn'><BsArrowRight />Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail