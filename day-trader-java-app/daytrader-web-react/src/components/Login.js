import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import Navbar from './shared/Navbar/Navbar'
import Footer from './shared/Footer/Footer'
import {LOCAL_GATEWAY_URL} from '../constants';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      uid: '',
      passwd: '',
      errorFlag:false,
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
      errorFlag: false
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { uid, passwd } = this.state
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    if (uid && passwd) {
      axios.patch(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/login/${uid}`, passwd, {
          headers: {
          'Content-Type': 'text/plain',
        }}
      ).then(res => {
        console.log('res', res)
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.profileID)
          this.props.history.push('/TradingAndPortfolios');
        }
      }).catch(err=>{
        this.setState({
          errorFlag:true
         })
      })
    }
  }

  render () {
    const {errorFlag}=this.state
    console.log('aaaa',errorFlag)
    return (
      <div className='app-login-container'>
        <Navbar />
        <div className='al-content'>
          <div className='al-login-box'>
            <div className='form-container'>
              <form onSubmit={this.handleLogin}>
                <div className='form-group'>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder='Username'
                    className='app-login-input'
                    name='uid'
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder='Password'
                    className='app-login-input'
                    name='passwd'
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className='error-message'>{errorFlag?<p>UnAuthorized User </p>:''}</div>
                <div className='form-group'>
                  <button className='app-login-button'>Login</button>
                </div>
                <div className='form-group regitster-link-section'>
                  <p>First time user ? Please <Link to='/Register'>Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Login