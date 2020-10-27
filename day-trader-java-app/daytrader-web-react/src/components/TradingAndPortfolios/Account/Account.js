import React, { Component } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import LoginNavbar from '../../shared/LoginNavbar/LoginNavbar';
import Footer from '../../shared/Footer/Footer';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Account.css';
import Loader from '../../Loader/Loader';
import {LOCAL_GATEWAY_URL} from '../../../constants';


class Accountpage extends Component {
  constructor() {
    super();
    this.state = {
      accountsummary: {},
      userinfo: {},
      ordersummary: {},
      curTime : new Date(),
      updateFlag:false,
      showAllOrdersinfo:[],
      showLoader: true,
    }
  }

  componentDidMount() {
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    const userId = localStorage.getItem('userId')
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/accounts/${userId}`)
      .then(res => {
        console.log('res', res)
        this.setState({
          accountsummary: res.data,
        })
      })
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/accounts/${userId}/profiles`)
      .then(res => {
        console.log('res', res)
        this.setState({
          userinfo: res.data,
          showLoader: false
        })
      })
  }

  handleOnInputChange = (e) => {
    const {userinfo} = this.state;
    const {name, value} = e.target;
    this.setState({
      userinfo: {
        ...userinfo,
        [name]: value
      }
    })
  }

  handleUpdateProfile = () => {
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    const {userinfo} = this.state
    const dataToSend = {
      address: userinfo.address,
      creditCard: userinfo.creditCard,
      email: userinfo.email,
      fullName: userinfo.fullName,
      password: userinfo.password,
      userID: userinfo.userID
    }
    const userId = localStorage.getItem('userId')
    axios.put(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/accounts/${userId}/profiles`, dataToSend)
      .then(res => {
        console.log('res', res);
        this.setState({
          updateFlag:true
        })
      })
  }
  showAllOrders=()=>{
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    const userId = localStorage.getItem('userId')
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/portfolios/${userId}/orders`)
    .then(res=>{
      console.log('res',res)
      this.setState({
        showAllOrdersinfo:res.data,
        showLoader: false
      })
    })

  }

  render() {
    const { accountsummary, ordersummary, userinfo ,curTime,updateFlag,showAllOrdersinfo, showLoader} = this.state
    const { accountID, loginCount, creationDate, lastLogin, openBalance, balance, logoutCount } = accountsummary;
    const { userID, fullName, address, email, creditCard, password } = userinfo;
    return (
      <div className='account-page-main-container'>
        {showLoader && <Loader />}
        <Navbar />
        <div className='app-login-navbar-section'>
          <LoginNavbar />
        </div>
        <div className='app-current-date-time-section' style={{maxWidth: '85%', margin: 'auto'}}>
          <p>{moment(curTime).format('ddd MMM DD hh:mm:ss')} IST {moment(curTime).format('YYYY') }</p>
        </div>
        <div className='update-message' style={{maxWidth: '85%', margin: 'auto'}}>{updateFlag ?<p>Account profile update successful</p>:''}</div>
        <div className='account-page-table-container'>
          <table className='account-page-table' cellPadding="0" cellSpacing="0">
            <tr className='table-header'>
              <td colSpan="6">Account Information</td>
            </tr>
            <tr className='table-row'>
              <td>Account Created: <span>{moment(creationDate).format('llll')}</span></td>
              <td>Last Login: <span>{lastLogin}</span></td>
            </tr>
            <tr className='table-row'>
              <td>Account ID: <span>{accountID}</span></td>
              <td>Total Logins: <span>{loginCount}</span></td>
              <td>Cash Balance: <span>{balance}</span></td>
            </tr>
            <tr className='table-row'>
              <td>User ID: <span>{userID}</span></td>
              <td>Total Logouts: <span>{logoutCount}</span></td>
              <td>Opening Balance: <span>{openBalance}</span></td>
            </tr>
          </table>
          <table className='recent-orders-table' cellSpacing='0' cellPadding='0' width='100%'>
            <tr className='table-header' >
              <td colSpan="5" className='total-orders-td'>Total Orders:</td>
              <td colSpan="5" className='show-all-orders-td' onClick={this.showAllOrders}><Link>show all orders</Link></td>
            </tr>
            <tr className='table-row'>
              <th><Link to="/Terms">Order ID</Link></th>
              <th><Link to="/Terms">Order Status</Link></th>
              <th><Link to="/Terms">Creation Date</Link></th>
              <th><Link to="/Terms">Completion Date</Link></th>
              <th><Link to="/Terms">Txn Free</Link></th>
              <th><Link to="/Terms">Type</Link></th>
              <th><Link to="/Terms">Symbol</Link></th>
              <th><Link to="/Terms">Quantity</Link></th>
              <th><Link to="/Terms">Price</Link></th>
              <th><Link to="/Terms">Total</Link></th>
            </tr>
            {/* <tr className='no-orders-row'>
              <td colSpan='10' style={{ textAlign: "center" }}>Recent Orders</td>
            </tr> */}
            {showAllOrdersinfo && showAllOrdersinfo.map((item,index)=>{
              const {orderID,orderStatus,openDate,completionDate,orderFee,orderType,symbol,quantity,price}=item;
              const total=(price*quantity);
              return(
                <tr className='table-row'>
                <td>{orderID}</td>
                <td>{orderStatus}</td>
                <td>{moment(openDate).format('llll')}</td>
                <td>{moment(completionDate).format('llll')}</td>
                <td>{orderFee}</td>
                <td>{orderType}</td>
                <td>{symbol}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{total}</td>
                </tr>
              )
            }
            )}
          </table>
          <table className='account-update-table' cellPadding='0' cellSpacing='0' width='100%'>
            <tr className='table-header'>
              <td colSpan='2'>Account Profile</td>
            </tr>
            <tr className='account-update-table-row'>
              <td>
                <label>User ID:</label>
                <input
                  type="text"
                  name="userid"
                  value={userID}
                  onChange={this.handleOnInputChange}
                />
              </td>
              <td>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={fullName}
                  onChange={this.handleOnInputChange}
                />
              </td>
            </tr>
            <tr className='account-update-table-row'>
              <td>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleOnInputChange}
                />
              </td>
              <td>
                <label>Address:</label>
                <input
                  type="address"
                  name="address"
                  value={address}
                  onChange={this.handleOnInputChange}
                />
              </td>
            </tr>
            <tr className='account-update-table-row'>
              <td>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmpassowrd"
                  value={password}
                  onChange={this.handleOnInputChange}
                />
              </td>
              <td>
                <label>Credit Card</label>
                <input
                  type="text"
                  name="creditcard"
                  value={creditCard}
                  onChange={this.handleOnInputChange}
                />
              </td>
            </tr>
            <tr className='account-update-table-row'>
              <td>
                <label>Email-Address</label>
                <input
                  type="email"
                  name="emailadress"
                  value={email}
                  onChange={this.handleOnInputChange}
                />
              </td>
              <td>
                <button onClick={this.handleUpdateProfile}>Update-Profile</button>
              </td>
            </tr>
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Accountpage