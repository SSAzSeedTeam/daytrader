import React, {useEffect, useState} from 'react'
import './LoginNavbar.css'
import { NavLink, withRouter } from 'react-router-dom'
import axios from 'axios'

const LoginNavbar = (props) => {
  const [showLoginNavbar, setShowLoginNavbar] = useState(false)
  const userId = localStorage.getItem('userId');
  const handleLogOut = () => {
    let endPointUrl = 'https://localhost:2443'
    const el = document.getElementById('end-point-url')
    if (el) {
      endPointUrl = el.getAttribute('data-end-point')
      if (endPointUrl === 'GATEWAY_END_POINT_URL') {
        endPointUrl = 'https://localhost:2443'
      }
    }
    axios.patch(`${endPointUrl}/logout/${userId}`)
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