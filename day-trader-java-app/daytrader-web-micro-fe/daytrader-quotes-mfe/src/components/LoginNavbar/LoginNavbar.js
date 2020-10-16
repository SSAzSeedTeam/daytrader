import React from 'react'
import './LoginNavbar.css'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'

const LoginNavbar = (props) => {
  const userId = localStorage.getItem('userId');
  const handleLogOut = () => {
  }
  let page = 'Home'
  if (props.location.pathname !== '/TradingAndPortfolios') {
    page = props.location.pathname.replace('/', '')
  }
  return (
    <div className='app-login-navbar-container'>
      <div className='aln-contet'>
        <div className='top-banner-container'>
          <div className='left-side'>
            {`DayTrader ${page}`}
          </div>
          <div className='right-side'>
            DayTrader
          </div>
        </div>
        <div className='aln-nav-links'>
          <NavLink activeClassName='active-link' exact to='/TradingAndPortfolios'>Home</NavLink>
          <NavLink activeClassName='active-link' to='/Account'>Account</NavLink>
          <NavLink activeClassName='active-link' to='/Portfolio'>Portfolio</NavLink>
          <NavLink activeClassName='active-link' to='/trading/quotes'>Quotes/Trade</NavLink>
          <a href="#" onClick={handleLogOut}>Logoff</a>
        </div>
      </div>
    </div>
  )
}

export default withRouter(LoginNavbar)