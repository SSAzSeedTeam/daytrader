import React from 'react'
// import footerImage from '../../../assets/copyRight.gif'
import './Footer.css'

const Footer = () => {
  return (
    <div className='app-footer-container'>
      <div className='app-footer-content'>
        {/* <img className='footer-image' src={footerImage} /> */}
        <h4>Copyright {new Date().getFullYear()}, Apache Software Foundation. All Rights Reserved</h4>
      </div>
    </div>
  )
}

export default Footer;
