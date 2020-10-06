import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import logoImage from '../../../assets/dayTraderLogo.gif'

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
            <NavLink activeClassName="active-link" to='/' exact>Home</NavLink>
            <NavLink activeClassName="active-link" to='/login'>Trading & Portfolios</NavLink>
            <NavLink activeClassName="active-link" to='/configuration'>Configuration</NavLink>
            <NavLink activeClassName="active-link" to='/primitives'>Primitives</NavLink>
            <NavLink activeClassName="active-link" to='/faq'>FAQ</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar