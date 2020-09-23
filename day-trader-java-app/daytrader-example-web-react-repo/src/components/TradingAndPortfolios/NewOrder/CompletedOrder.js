import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import './NewOrder.css'
import moment from 'moment';


const status = 'closed'
const userId = localStorage.getItem('userId')
class CompletedOrderPage extends Component {
  constructor() {
    super();
    this.state = {
      completedorderinfo: [],
    }
  }

  componentDidMount() {
    axios.patch(`https://localhost:3443/portfolios/${userId}/orders?status=${status}`)
      .then(res => {
        console.log('res ---<', res)
        this.setState({
          completedorderinfo: res.data
        })
      })
  }
  render() {
    const { completedorderinfo } = this.state
    return (
      <div>
        {completedorderinfo && completedorderinfo.length > 0 && (
          <table className='completed-order-table quotes-table' cellSpacing="0" cellPadding="0" width="100%" style={{marginBottom: 15}}>
            <tr className='table-header'>
              <td colSpan="8" style={{backgroundColor: '#cc3f3f', color: '#fff'}}>Alert: the following order(s) have completed.</td>
            </tr>
            <tr className='table-header-row'>
              <th><Link to='/Terms'>Order ID</Link></th>
              <th><Link to='/Terms'>Order Status</Link></th>
              <th><Link to='/Terms'>Creation Date</Link></th>
              <th><Link to='/Terms'>Completion Date</Link></th>
              <th><Link to='/Terms'>Txn Fee</Link></th>
              <th><Link to='/Terms'>Type</Link></th>
              <th><Link to='/Terms'>Symbol</Link></th>
              <th><Link to='/Terms'>Quantity</Link></th>
            </tr>
            {completedorderinfo && completedorderinfo.map((q, i) => {
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
        )}
      </div>
    )
  }
}
export default CompletedOrderPage