import React, { Component } from 'react'
import axios from 'axios'
import './Register.css'
import Navbar from './shared/Navbar/Navbar'
import Footer from './shared/Footer/Footer'
import {LOCAL_GATEWAY_URL} from '../constants';

class Registerpage extends Component {
  constructor () {
    super()
    this.state = {
      address: '',
      creditCard: '',
      email: '',
      fullName: '',
      password: '',
      userID: '',
      openBalance: '',
      confirmPassword: '',
      showErrorMessage: false
    }
  }

  handleOnChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleRegister = (e) => {
    e.preventDefault()
    const { fullName, address, email, userID, password, confirmPassword, openBalance, creditCard } = this.state
    if (!fullName || !address || !email || !userID || password !== confirmPassword || !openBalance || !creditCard) {
      this.setState({
        showErrorMessage: true
      })
    } else {
      const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
      axios.post(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/accounts`, {
        accountID: 0,
        balance: 0,
        creationDate: new Date(),
        lastLogin: new Date(),
        loginCount: 0,
        logoutCount: 0,
        openBalance,
        profile: {
          address,
          creditCard,
          email,
          fullName,
          password,
          userID
        },
        profileID: userID
      }).then(res => {
        console.log('res', res)
        if (res.status === 201) {
          localStorage.setItem('userId', res.data.profileID)
          this.props.history.push('/TradingAndPortfolios');
        } else {
          window.alert('Something went wrong, Please try again')
        }
      }).catch(e => {
        window.alert('Something went wrong, Please try again')
      })
    }
  }

  render() {
    const { fullName, address, email, userID, password, confirmPassword, openBalance, creditCard, showErrorMessage } = this.state
    return (
      <div className='app-register-container'>
        <Navbar />
        <div className='ar-content'>
          <div className='ar-register-box'>
            <div className='form-container'>
              <form onSubmit={this.handleRegister}>
                <div className='form-group'>
                  <label><span>*</span>Full Name:</label>
                  <input
                    type="text"
                    className='app-register-input'
                    name='fullName'
                    onChange={this.handleOnChange}
                    value={fullName}
                  />
                </div>
                <div className='form-group'>
                <label><span>*</span>Address:</label>
                <input
                  type="text"
                  className='app-register-input'
                  name='address'
                  onChange={this.handleOnChange}
                  value={address}
                />
              </div>
              <div className='form-group'>
                <label><span>*</span>E-mail address:</label>
                <input
                  type="text"
                  className='app-register-input'
                  name='email'
                  onChange={this.handleOnChange}
                  value={email}
                />
              </div>
              <div className='form-group'>
                <label><span>*</span>User ID:</label>
                <input
                  type="text"
                  className='app-register-input'
                  name='userID'
                  onChange={this.handleOnChange}
                  value={userID}
                />
              </div>
              <div className='form-group'>
                <label><span>*</span>Password</label>
                <input
                  type="password"
                  className='app-register-input'
                  name='password'
                  onChange={this.handleOnChange}
                  value={password}
                />
              </div>
              <div className='form-group'>
                <label><span>*</span>Confirm Password</label>
                <input
                  type="password"
                  className='app-register-input'
                  name='confirmPassword'
                  onChange={this.handleOnChange}
                  value={confirmPassword}
                />
                {showErrorMessage && password !== confirmPassword && <p style={{color: '#cc3f3f', fontSize: 12, textAlign: 'right', margin: 0}}>Passwords are not matching!</p>}
              </div>
              <div className='form-group'>
                <label><span>*</span>Opening account balance:</label>
                <input
                  type="text"
                  className='app-register-input'
                  name='openBalance'
                  onChange={this.handleOnChange}
                  value={openBalance}
                />
              </div>
              <div className='form-group'>
                <label><span>*</span>Credit card number:</label>
                <input
                  type="text"
                  className='app-register-input'
                  name='creditCard'
                  onChange={this.handleOnChange}
                  value={creditCard}
                />
              </div>
              {showErrorMessage && <p style={{color: '#cc3f3f', fontSize: 12, textAlign: 'right', margin: 0}}>Please fill out all mandatory fields.</p>}
              <div className='form-group'>
                <label></label>
                <input type="submit" className='app-register-input submit-button' value='Submit Registration' />
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
export default Registerpage