import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';
import {Link} from 'react-router-dom';
import { TXN_FEE, LOCAL_GATEWAY_URL } from '../constants';
import CompletedOrderPage from '../order/completed-order';
import './portfolio.css';

const trade = 'sell'
const mode=0
class PortfolioPage extends Component {
  constructor() {
    super();
    this.state = {
      ordersinfo: {},
      holdingsinfo: [],
      quotes: {},
      curTime : new Date(),
      tableinfo:{},
      apiUrl: 'https://localhost:2443',
    }
  }

  componentDidMount() {
    let endPointUrl = 'https://localhost:2443'
    const el = document.getElementById('end-point-url')
    if (el) {
      endPointUrl = el.getAttribute('data-end-point')
      if (endPointUrl === 'GATEWAY_END_POINT_URL') {
        endPointUrl = 'https://localhost:2443'
      }
    }
    const userId = localStorage.getItem('userId')
    let holdingsinfo = [];
    axios.get(`${endPointUrl}/portfolios/${userId}/holdings`).
      then(async (res) => {
        console.log('res', res);
        if (res.data && res.data.length > 0) {
          holdingsinfo = [...res.data];
          for (let i = 0; i < res.data.length; i += 1) {
            let symbol = res.data[i].quoteID;
            await axios.get(`${endPointUrl}/quotes/${symbol}`)
              .then(res => {
                console.log('res inner', res)
                const {price} = res.data;
                holdingsinfo[i].currentPrice = price
              })
          }
          this.setState({
            holdingsinfo,
            apiUrl: endPointUrl
          })
        }
        console.log('holdingsInfo', holdingsinfo)
      })
  }

  getSumOfPurchaseBasis = () => {
    const { holdingsinfo } = this.state
    let sum = 0;
    for (let i = 0; i < holdingsinfo.length; i += 1) {
      const { quantity, purchasePrice } = holdingsinfo[i];
      sum = sum + (quantity * purchasePrice);
    }
    return sum;
  }
  getSumOfMarketValue = () => {
    const { holdingsinfo } = this.state
    let sum = 0;
    for (let i = 0; i < holdingsinfo.length; i += 1) {
      const { quantity, currentPrice } = holdingsinfo[i];
      sum = sum + (quantity * currentPrice);
    }
    return sum;
  }
  handleSellOrder = (holdingID, symbol, price, quantity) => {
    const userID = localStorage.getItem('userId');
  //  const cDate = new Date();
    const dataToSend = {
      accountID: 0,
      buy: true,
      cancelled: false,
      completed: true,
      completionDate: new Date(),
      holdingID: holdingID,
      open: true,
      openDate: new Date(),
      orderID: Math.floor((Math.random()) * 10000),
      orderStatus: "open",
      orderFee: TXN_FEE,
      orderType: "sell",
      price,
      quantity,
      sell: true,
      symbol,
    }
    const {apiUrl}=this.state
    console.log('dataToSend', dataToSend);
    axios.post(`${apiUrl}/portfolios/${userID}/orders?mode=${mode}`, dataToSend)
      .then(res => {
        console.log('res', res);
        if (res.status === 201) {
          this.props.history.push({pathname: '/trading/new-order', state: res.data})
        }
      })
  }

  render() {
    const { ordersinfo, holdingsinfo, quotes,curTime } = this.state
    const SumOfPurchaseBasis = this.getSumOfPurchaseBasis();
    const SumOfMarketValue=this.getSumOfMarketValue();
    const totalProfit = (SumOfMarketValue - SumOfPurchaseBasis).toFixed(2)
    return (
      <div className='portfolio-page-container'>
        <div className='app-current-date-time-section' style={{maxWidth: '85%', margin: 'auto'}}>
          <p>{moment(curTime).format('ddd MMM DD hh:mm:ss')} IST {moment(curTime).format('YYYY') }</p>
        </div>
        <div><CompletedOrderPage /></div>
        <div className='portfolio-page-table-container'>
          <table width="100%" cellSpacing="0" cellPadding="0" className='portfolio-table'>
            <tr className='table-header'>
              <td colSpan='6'>Portfolio</td>
              <td colSpan='4' style={{textAlign: "right"}}>Number of Holdings: {holdingsinfo.length}</td>
            </tr>
            <tr className='table-row'>
              <th><Link to='/Terms'>Holding ID</Link></th>
              <th><Link to='/Terms'>Purchase Date</Link></th>
              <th><Link to='/Terms'>Symbol</Link></th>
              <th><Link to='/Terms'>Quantity</Link></th>
              <th><Link to='/Terms'>Purchase Price</Link></th>
              <th><Link to='/Terms'>Current Price</Link></th>
              <th><Link to='/Terms'>Purchase Basis</Link></th>
              <th><Link to='/Terms'>Market value</Link></th>
              <th><Link to='/Terms'>Gain/(loss)</Link></th>
              <th><Link to='/Terms'>Trade</Link></th>
            </tr>
            {holdingsinfo.map((item, index) => {
              const { holdingID, quantity, purchasePrice, purchaseDate, quoteID, currentPrice } = item;
              const purchasebasis = (quantity * purchasePrice);
              const marketvalue = (quantity * currentPrice);
              const GainOrLoss= (purchasebasis-marketvalue);
              return (
                <tr className='table-row' key={`top-holdings-data-row-${index}`}>
                  <td>{holdingID}</td>
                  <td>{moment(purchaseDate).format('llll')}</td>
                  <td>{quoteID}</td>
                  <td>{quantity ? quantity.toFixed(1) : 0.0}</td>
                  <td>{purchasePrice ? purchasePrice.toFixed(2) : 0.0}</td>
                  <td>{currentPrice ? currentPrice.toFixed(2) : 0.0}</td>
                  <td>{purchasebasis ? purchasebasis.toFixed(2) : 0.0}</td>
                  <td>{marketvalue ? marketvalue.toFixed(2) : 0.0}</td>
                  <td style={{color: GainOrLoss > 0 ? 'green' : 'red'}}>{GainOrLoss ? GainOrLoss.toFixed(2) : 0.0}<span>{GainOrLoss >= 0 ? '+' : '-'}</span></td>
                  <td onClick={() => this.handleSellOrder(holdingID, quoteID, currentPrice, quantity)}><Link>{trade}</Link></td>
                </tr>

              )
            })}
            <tr className='table-row'>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>${SumOfPurchaseBasis}</td>
              <td>${SumOfMarketValue}</td>
              <td colSpan="2" style={{color: totalProfit > 0 ? 'green' : 'red'}}>
                ${totalProfit}
                <span>{totalProfit >= 0 ? '+' : '-'}</span>
                ({totalProfit > 0 ? '+' : '-'}{Math.ceil(totalProfit * 100 / SumOfPurchaseBasis).toFixed(2)}%)
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
export default PortfolioPage