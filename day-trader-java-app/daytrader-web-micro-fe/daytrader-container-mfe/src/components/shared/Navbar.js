import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/dayTraderLogo.gif'

const Navbar = () => {
  return (
    <div className='app-navbar-container'>
      <div className='an-contet'>
        <div className='left-side'>
          <img src={logoImage} />
          {/* <p className='company-info'>
            <span>DAY</span>
            <span className='colored-text'>TRADER</span>
          </p> */}
        </div>
        <div className='right-side'>
          <div className='nav-links'>
            <Link to='/'>Home</Link>
            <Link to='/login'>Trading & Portfolios</Link>
            <Link to='/configuration'>Configuration</Link>
            <Link to='/primitives'>Primitives</Link>
            <Link to='/faq'>FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar