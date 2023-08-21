import React from 'react'
import { ReactComponent as IconLogo } from "../../svg/logo_blue.svg"
import {BiLogoFacebook,BiLogoInstagram,} from "react-icons/bi"
import {CiTwitter} from "react-icons/ci"
import "./footer.scss"

function Footer() {
  return (
    <footer className='footer'>
      <div className="container">
        <div className="left">
          <IconLogo />
        </div>
        <div className="center">
          ©2023 Monster Pizza
        </div>
        <div className="right">
          <span className="iconContainer">
            <BiLogoFacebook/>
          </span>
          <span className="iconContainer">
            <BiLogoInstagram/>
          </span>
          <span className="iconContainer">
            <CiTwitter/>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer