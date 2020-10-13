import React, { Component } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import LoginNavbar from '../../shared/LoginNavbar/LoginNavbar';
import Footer from '../../shared/Footer/Footer';
import axios from 'axios'
import './Portfolio.css';
import moment from 'moment';
import {Link} from 'react-router-dom';
import downarrow from '../../../assets/arrowdown.gif';
import uparrow from '../../../assets/arrowup.gif';
import { TXN_FEE } from '../../../constants';
import CompletedOrder from '../NewOrder/CompletedOrder';
import {LOCAL_GATEWAY_URL} from '../../../constants';

const trade = 'sell'
const mode=0
class Portfoliopage extends Component {
  constructor() {
    super();
    this.state = {
      ordersinfo: {},
      holdingsinfo: [],
      quotes: {},
      curTime : new Date(),
      tableinfo:{},
    }
  }

  componentDidMount() {
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    const userId = localStorage.getItem('userId')
    let holdingsinfo = [];
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/portfolios/${userId}/holdings`).
      then(async (res) => {
        console.log('res', res);
        if (res.data && res.data.length > 0) {
          holdingsinfo = [...res.data];
          for (let i = 0; i < res.data.length; i += 1) {
            let symbol = res.data[i].quoteID;
            await axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/quotes/${symbol}`)
              .then(res => {
                console.log('res inner', res)
                const {price} = res.data;
                holdingsinfo[i].currentPrice = price
              })
          }
          this.setState({
            holdingsinfo
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
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
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
    console.log('dataToSend', dataToSend);
    axios.post(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/portfolios/${userID}/orders?mode=${mode}`, dataToSend)
      .then(res => {
        console.log('res', res);
        if (res.status === 201) {
          this.props.history.push({pathname: '/NewOrder', state: res.data})
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
        <Navbar />
        <div className='app-login-navbar-section'>
          <LoginNavbar />
        </div>
        <div className='app-current-date-time-section' style={{maxWidth: '85%', margin: 'auto'}}>
          <p>{moment(curTime).format('ddd MMM DD hh:mm:ss')} IST {moment(curTime).format('YYYY') }</p>
        </div>
        <div><CompletedOrder /></div>
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
                  <td style={{color: GainOrLoss > 0 ? 'green' : 'red'}}>{GainOrLoss ? GainOrLoss.toFixed(2) : 0.0}<img className='uparrow-image' src={GainOrLoss > 0 ? uparrow : downarrow} /></td>
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
                <img className='uparrow-image' src={totalProfit > 0 ? uparrow : downarrow} />
                ({totalProfit > 0 ? '+' : '-'}{Math.ceil(totalProfit * 100 / SumOfPurchaseBasis).toFixed(2)}%)
              </td>
            </tr>
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Portfoliopage