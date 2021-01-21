import React, { Component } from 'react'
import LoginNavbar from '../shared/LoginNavbar/LoginNavbar';
import axios from 'axios'
import './new-order.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LOCAL_GATEWAY_URL } from '../../constants';

const mode = 0;

const status = 'closed'
const userId = localStorage.getItem('userId')
class NewOrderpage extends Component {
  constructor() {
    super();
    this.state = {
      orderInfo: [],
    }
  }
  componentDidMount() {

    const userId = localStorage.getItem('userId')
    let endPointUrl = 'http://localhost:2443'
    const el = document.getElementById('end-point-url')
    if (el) {
      endPointUrl = el.getAttribute('data-end-point')
      if (endPointUrl === 'GATEWAY_END_POINT_URL') {
        endPointUrl = 'http://localhost:2443'
      }
    }
    axios.patch(`${endPointUrl}/portfolios/${userId}/orders?status=${status}`)
      .then(res => {
        console.log('res ---<', res)
        this.setState({
          orderInfo: res.data
        })
      })
  }

  render() {
    console.log('prsops', this.props)
    const { orderInfo } = this.state
    const { orderID, symbol, quantity } = orderInfo && orderInfo.length ? orderInfo[0] : { orderID: 0, symbol: 's0', quantity: 1 }
    return (
      <div>
        <div className='new-order-container'>
          <table className='new-order-table' width="100%" cellSpacing="0" cellPadding="0">
            <tr className='table-header'>
              <td colSpan="8">New Order</td>
            </tr>
            <tr className='table-row'><td style={{ textAlign: "left" }} colSpan="8">Order {orderID} to buy {quantity} shares of {symbol} has been submitted for processing.</td></tr>
            <tr className='table-row'><td style={{ textAlign: "left" }} colSpan="8">Order {orderID} details:</td></tr>
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
            {orderInfo && orderInfo.map((q, i) => {
              const { orderID, orderStatus, openDate, completionDate, orderFee, orderType, symbol, quantity } = q;
              return (
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
              )
            })}
          </table>
        </div>
      </div>
    )
  }
}
export default NewOrderpage