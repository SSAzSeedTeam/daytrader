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
      authUrl: 'http://localhost:1555',
      authFlag: true
    }
  }

  componentDidMount() {
    const el2 = document.getElementById('auth-url');

    const el = document.getElementById('end-point-url');


    const el3 = document.getElementById('auth-flag');

    if (el || el2) {
      let endPointUrl = el.getAttribute('data-end-point')
      let authenticationUrl = el2.getAttribute('auth-end-point')
      let authenticationFlag = el3.getAttribute('auth-flag') // if true then pass auth token

      if (endPointUrl === 'GATEWAY_END_POINT_URL') {
        console.log(endPointUrl)
        endPointUrl = 'http://localhost:2443'
      }
      if (authenticationUrl === 'AUTH_URL') {
        // if docker dont have value for this variable then

        console.log(authenticationUrl)

        authenticationUrl = 'http://localhost:1555'
      }

      if (authenticationFlag === "AUTH_FLAG") {

        // need to be replace from env or constant 
        //REACT_APP_AUTH_FLAG
        //authenticationFlag = true
        const { REACT_APP_AUTH_FLAG } = process.env;
        authenticationFlag = REACT_APP_AUTH_FLAG;
        console.log(authenticationFlag)


      }



      this.setState({
        apiUrl: endPointUrl,
        authUrl: authenticationUrl,
        authFlag: authenticationFlag
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

  handleLogin = (e) => {

    e.preventDefault()
    const { uid, passwd, apiUrl, authUrl, authFlag } = this.state
    console.log("===>" + authFlag)
    if (authFlag === 'true') {
      console.log('inside authentication api')
      axios.post(`${authUrl}/authenticate?username=${uid}&password=${passwd}`)
        .then(res => {
          if (res.status === 200) {
            const token = res.data.token
            localStorage.setItem('authToken', token)

            // callLoginApi(uuid, passwd)
            if (uid && passwd) {
              console.log('inside login api' + localStorage.getItem('authToken') + " token")
              axios.patch(`${apiUrl}/login/${uid}`, passwd, {
                headers: {
                  'Content-Type': 'text/plain',
                  'Authorization': 'Bearer ' + token
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
        }).catch(err => {
          this.setState({
            errorFlag: true
          })
        })
    }
    if (uid && passwd && authFlag === 'false') {
      //callLoginApi(uuid,passwd)
      localStorage.removeItem('authToken')
      console.log('inside login api' + localStorage.getItem('authToken') + " token")
      axios.patch(`${apiUrl}/login/${uid}`, passwd, {
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