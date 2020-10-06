import React, { Component } from 'react'
import Navbar from '../../shared/Navbar/Navbar';
import LoginNavbar from '../../shared/LoginNavbar/LoginNavbar';
import Footer from '../../shared/Footer/Footer';
import axios from 'axios'
import './NewOrder.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
const mode = 0;
const userId = localStorage.getItem('userId')
class NewOrderpage extends Component {
  constructor() {
    super();
    this.state = {
      neworderinfo: [],
    }
  }
  render() {
    console.log('prsops', this.props)
    const {location} = this.props
    const {state} = location;
    const {orderID, orderStatus, openDate, completionDate, orderFee, orderType, symbol, quantity} = state;
    return (
      <div>
        <Navbar />
        <div className='app-login-navbar-section'>
          <LoginNavbar />
        </div>
        <div className='new-order-container'>
          <table className='new-order-table' width="100%" cellSpacing="0" cellPadding="0">
            <tr className='table-header'>
              <td colSpan="8">New Order</td>
            </tr>
            <tr className='table-row'><td style={{textAlign: "left"}} colSpan="8">Order {orderID} to buy {quantity} shares of {symbol} has been submitted for processing.</td></tr>
            <tr className='table-row'><td style={{textAlign: "left"}} colSpan="8">Order {orderID} details:</td></tr>
            <tr className='table-row'>
              <th>Order ID</th>
              <th>Order Status</th>
              <th>Creation Date</th>
              <th>Completion Date</th>
              <th>Txn Fee</th>
              <th>Type</th>
              <th>Symbol</th>
              <th>Quantity</th>
            </tr>
            <tr className='table-row'>
              <td>{orderID}</td>
              <td>{orderStatus}</td>
              <td>{moment(openDate).format('llll')}</td>
              <td>{moment(completionDate).format('llll')}</td>
              <td>{orderFee}</td>
              <td>{orderType}</td>
              <td>{symbol}</td>
              <td>{quantity}</td>
            </tr>
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}
export default NewOrderpage