import React, {useEffect, useState} from 'react'
import './LoginNavbar.css'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'
import { LOCAL_GATEWAY_URL } from '../../../constants'

const LoginNavbar = (props) => {
  const [showLoginNavbar, setShowLoginNavbar] = useState(false)
  const userId = localStorage.getItem('userId');
  const handleLogOut = () => {

    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    
    axios.patch(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/logout/${userId}`)
      .then(res => {
        localStorage.removeItem('userId');
        props.history.push('/login');
      })
  }

  useEffect(() => {
    if (props.location.pathname.includes('/trading')) {
      setShowLoginNavbar(true)
    } else {
      setShowLoginNavbar(false)
    }
  }, [props.location.pathname])
  
  return (
    <>
      {showLoginNavbar && (
        <div className='app-login-navbar-container'>
          <div className='aln-contet'>
            <div className='top-banner-container'>
              <div className='left-side'>
                DayTrader
              </div>
              <div className='right-side'>
                DayTrader
              </div>
            </div>
            <div className='aln-nav-links'>
              <NavLink activeClassName='active-link' exact to='/trading'>Home</NavLink>
              <NavLink activeClassName='active-link' to='/trading/accounts'>Account</NavLink>
              <NavLink activeClassName='active-link' to='/trading/portfolio'>Portfolio</NavLink>
              <NavLink activeClassName='active-link' to='/trading/quotes'>Quotes/Trade</NavLink>
              <a href="#" onClick={handleLogOut}>Logoff</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default withRouter(LoginNavbar)