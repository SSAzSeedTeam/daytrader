import React, { Component } from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import LoginNavbar from '../../shared/LoginNavbar/LoginNavbar';
import Footer from '../../shared/Footer/Footer';
import axios from 'axios'
import './QuotesOrTrade.css';
import {Link} from 'react-router-dom';
import downarrow from '../../../assets/arrowdown.gif';
import uparrow from '../../../assets/arrowup.gif';
import moment from 'moment-timezone';
import { TXN_FEE } from '../../../constants';
import CompletedOrder from '../NewOrder/CompletedOrder';

const mode = 0;
class QuotesOrTradepage extends Component {
  constructor() {
    super();
    this.state = {
      quotes: ['s:0', 's:1', 's:2', 's:3', 's:4'],
      quotesData: [],
      quotesinfo: {},
      curTime : new Date().toLocaleString(),
    }
  }

  getQuotesBySymbol = async () => {
    const {quotes} = this.state
    let quotesData = [];
    let obj = {};
    for(let i = 0; i < quotes.length; i += 1) {
      const symbol = quotes[i];
      await axios.get(`https://localhost:4443/quotes/${symbol}`)
      .then(res => {
        console.log('res', res)
        quotesData.push(res.data);
        obj[`symbol${i}`] = 100;
      })
    }
    this.setState({
      quotesData,
      ...obj
    })
  }

  componentDidMount() {
    this.getQuotesBySymbol();
  }

  handleOnQuoteChange = (e) => {
    const {value} = e.target;
    this.setState({
      quotes: value.split(',')
    })
  }

  handleUpdateQuotes = () => {
    this.getQuotesBySymbol();
  }

  handleOnQuantityChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleBuyOrder = (symbol, i, price) => {
    const quantity = this.state[`symbol${i}`]
    const userID = localStorage.getItem('userId');
    const cDate = new Date();
    const dataToSend = {
      accountID: 0,
      buy: true,
      cancelled: false,
      completed: true,
      completionDate: new Date(),
      holdingID: 0,
      open: true,
      openDate: new Date(),
      orderID: Math.floor((Math.random()) * 10000),
      orderStatus: "open",
      orderFee: TXN_FEE,
      orderType: "buy",
      price,
      quantity,
      sell: true,
      symbol,
    }
    console.log('dataToSend', dataToSend);
    axios.post(`https://localhost:3443/portfolios/${userID}/orders?mode=${mode}`, dataToSend)
      .then(res => {
        console.log('res', res);
        if (res.status === 201) {
          this.props.history.push({pathname: '/NewOrder', state: res.data})
        }
      })
  }

  render() {
    const {quotesData, quotes,curTime} = this.state
    const timezone = moment.tz('Asia/Kolkata').zoneAbbr()
    return (
      <div>
        <Navbar />
        <div className='app-login-navbar-section'>
          <LoginNavbar />
        </div>
        <div className='quotes-content-container'>
          <div className='app-current-date-time-section'> 
           <p>{moment(curTime).format('ddd MMM DD hh:mm:ss')} IST {moment(curTime).format('YYYY') }</p>
          </div>
          <div><CompletedOrder /></div>
          <table className='quotes-table' cellPadding="0" cellSpacing="0" width="100%">
            <tr className='table-header'>
              <td colSpan="8">Quotes</td>
            </tr>
            <tr className='table-row'>
              <th><Link to='/Terms'>Symbol</Link></th>
              <th><Link to='/Terms'>Company</Link></th>
              <th><Link to='/Terms'>Volume</Link></th>
              <th><Link to='/Terms'>Price Range</Link></th>
              <th><Link to='/Terms'>Open Price</Link></th>
              <th><Link to='/Terms'>Current Price</Link></th>
              <th><Link to='/Terms'>Gain/(Loss)</Link></th>
              <th><Link to='Terms'>Trade</Link></th>
            </tr>
            {quotesData && quotesData.map((q, i) => {
              const {symbol, companyName, volume, price, low, high, open, change} = q;
              const gOrL= Math.ceil(((price - open) / open) * 100)
              return (
                <tr className='table-row'>
                  <td><Link to='/Terms'>{symbol}</Link></td>
                  <td>{companyName}</td>
                  <td>{volume}</td>
                  <td>${low.toFixed(2)} - ${high.toFixed(2)}</td>
                  <td>${open.toFixed(2)}</td>
                  <td>${price.toFixed(2)}</td>
                  <td style={{color: gOrL >= 0 ? 'green' : 'red'}}>{(price - open).toFixed(2)}<img className='uparrow-image' src={gOrL >= 0 ? uparrow : downarrow} />
                  ({gOrL.toFixed(2)}%)<img className='uparrow-image' src={gOrL >= 0 ? uparrow : downarrow} />
                  </td>
                  <td className='buy-shares-td'>
                    <input
                      type="text"
                      value={this.state[`symbol${i}`]}
                      onChange={this.handleOnQuantityChange}
                      name={`symbol${i}`}
                    />
                    <button onClick={() => this.handleBuyOrder(symbol, i, price)}>Buy</button>
                  </td>
                </tr>
              )
            })}
          </table>
          <div className='quote-form-container'>
            <div className='qfc-left-side'>
              Note: Click any <Link to='/Terms'>symbol</Link> for a quote or to trade.
            </div>
            <div className='qfc-right-side'>
              <input
                type="text"
                value={quotes.join(',')}
                onChange={this.handleOnQuoteChange}
              />
              <button onClick={this.handleUpdateQuotes}>Quotes</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default QuotesOrTradepage