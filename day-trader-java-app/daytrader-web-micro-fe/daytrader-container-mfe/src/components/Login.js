import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import Navbar from './shared/Navbar/Navbar'
import Footer from './shared/Footer/Footer'
import { axiosClient } from '../authentication'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      uid: '',
      passwd: '',
      errorFlag: false,
      apiUrl: 'http://localhost:2443',
      authUrl: 'http://localhost:1555'
    }
  }

  componentDidMount() {
    const el = document.getElementById('end-point-url')
    if (el) {
      let endPointUrl = el.getAttribute('data-end-point')
      if (endPointUrl === 'GATEWAY_END_POINT_URL') {
        endPointUrl = 'http://localhost:2443'
      }
      this.setState({
        apiUrl: endPointUrl
      })
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
      errorFlag: false
    })
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { uid, passwd, apiUrl, authUrl } = this.state;
    const { data } = await axios.post(`${authUrl}/authenticate?username=${uid}&password=${passwd}`);
    data ? localStorage.setItem('authToken', data.token) : localStorage.setItem('authToken', '')
    if (uid && passwd) {
      axiosClient.patch(`${apiUrl}/login/${uid}`, passwd, {
        headers: {
          'Content-Type': 'text/plain',
        }
      }
      ).then(res => {
        console.log('res', res)
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.profileID)
          this.props.history.push('/trading');
        }
      }).catch(err => {
        this.setState({
          errorFlag: true
        })
      })
    }
  }

  render() {
    const { errorFlag } = this.state
    console.log('aaaa', errorFlag)
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
                <div className='error-message'>{errorFlag ? <p>UnAuthorized User </p> : ''}</div>
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