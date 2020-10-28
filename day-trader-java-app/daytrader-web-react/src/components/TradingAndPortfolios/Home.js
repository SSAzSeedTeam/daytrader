import React, { Component } from 'react';
import Navbar from '../shared/Navbar/Navbar'
import LoginNavbar from '../shared/LoginNavbar/LoginNavbar'
import Footer from '../shared/Footer/Footer'
import axios from 'axios';
import moment from 'moment';
import './Home.css';
import { Link } from 'react-router-dom';
import downarrow from '../../assets/arrowdown.gif';
import uparrow from '../../assets/arrowup.gif';
import CompletedOrder from './NewOrder/CompletedOrder';
import {LOCAL_GATEWAY_URL} from '../../constants';


const exchangeString = 'TSIA'
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      marketSummary: {},
      holdings: [],
      curTime : new Date(),
    }
  }

  componentDidMount () {
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    console.log('REACT_APP_DAYTRADER_GATEWAY_SERVICE', REACT_APP_DAYTRADER_GATEWAY_SERVICE)
    const userId = localStorage.getItem('userId');
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/markets/${exchangeString}`)
      .then(res => {
        console.log('res', res)
        this.setState({
          marketSummary: res.data
        })
      })
    
    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/accounts/${userId}`)
    .then(res => {
      console.log('res', res)
      this.setState({
        userInfo: res.data
      })
    })

    axios.get(`${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/portfolios/${userId}/holdings`)
    .then(res => {
      console.log('res', res)
      this.setState({
        holdings: res.data
      })
    })
  }

  getSumOfTotalHoldings = () => {
    const {holdings} = this.state;
    let sum = 0
    for (let i = 0; i < holdings.length; i += 1) {
      const { quantity, purchasePrice} = holdings[i];
      sum = sum + (quantity * purchasePrice);
    }
    return sum;
  }

  render () {
    console.log('process.env', process.env)
    const userId = localStorage.getItem('userId');
    const {marketSummary, userInfo, holdings,curTime} = this.state
    const {accountID, loginCount, creationDate, lastLogin, openBalance, balance, exchangeRate} = userInfo;
    const {summaryDate, gainPercent, tsia, topGainers, topLosers, openTSIA, volume} = marketSummary;
    const totalHoldings = holdings ? holdings.length : 0;
    const sumOfTotalHoldings = this.getSumOfTotalHoldings();
    const profit = (sumOfTotalHoldings + balance) - openBalance;
    return (
      <div className='dashboard-container'>
        <Navbar />
        <div className='app-login-navbar-section'>
          <LoginNavbar />
        </div>
        <div className='app-current-date-time-section' style={{maxWidth: '85%', margin: 'auto'}}>
          <p>{moment(curTime).format('ddd MMM DD hh:mm:ss')} IST {moment(curTime).format('YYYY') }</p>
        </div>
        <div className='completed-order-container'>
          <CompletedOrder/>
        </div>
        <div className='flex-container'>
          <div className='left-side-container'>
            <h4 className='welcome-heading'>
              Welcome {userId},
            </h4>
            <div className='account-summary-section'>
              <table cellPadding="0" cellSpacing="0" className='account-statistics-table'>
                <thead>
                  <tr className='heading-tr'>
                    <td colSpan="2">
                      User Statistics
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link>Account ID:</Link></td>
                    <td>{accountID}</td>
                  </tr>
                  <tr>
                    <td><Link>Account Created:</Link></td>
                    <td>{moment(creationDate).format('llll')}</td>
                  </tr>
                  <tr>
                    <td><Link>Total Logins:</Link></td>
                    <td>{loginCount}</td>
                  </tr>
                  <tr>
                    <td><Link>Session Created:</Link></td>
                    <td>{moment(lastLogin).format('llll')}</td>
                  </tr>
                  <tr className='heading-tr'>
                    <td colSpan="2">
                      Account Statistics
                    </td>
                  </tr>
                  <tr>
                    <td><Link>Cash Balance:</Link></td>
                    <td>${balance || 0.0}</td>
                  </tr>
                  <tr>
                    <td><Link>Number of Holdings:</Link></td>
                    <td>{totalHoldings || 0}</td>
                  </tr>
                  <tr>
                    <td><Link>Total of Holdings:</Link></td>
                    <td>${sumOfTotalHoldings}</td>
                  </tr>
                  <tr>
                    <td><Link>Sum of cash/holdings opening balance:</Link></td>
                    <td>${sumOfTotalHoldings + (balance || 0)}</td>
                  </tr>
                  <tr>
                    <td><Link>Opening Balance:</Link></td>
                    <td>${openBalance || 0.0}</td>
                  </tr>
                  <tr>
                    <td><Link>Current Gain ({profit > 0 ? 'profit' : 'loss'})</Link></td>
                    <td style={{color: profit > 0 ? 'green' : 'red'}}>${profit ? profit.toFixed(2) : 0.0}</td>
                  </tr>
                  <tr>
                    <td><Link>Exchange Rate: </Link></td>
                    <td>INR {exchangeRate ? exchangeRate.toFixed(4) : 76.0000}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='right-side-container'>
            <div className='dms-header'>
              <h4>Market Summary</h4>
              <p>{moment(summaryDate).format('llll')}</p>
            </div>
            <div className='dms-body'>
              <table cellPadding='0' cellSpacing="0" className='main-table'>
                <tr>
                  <td className='main-table-td'>
                    <Link to='/Terms'> Day Trader Stock Index (TSIA):</Link>
                  </td>
                  <td className='main-table-td-td'>
                    {openTSIA}
                  </td>
                </tr>
                <tr>
                  <td className='main-table-td'>
                    <Link to='/Terms'>Trading Volume:</Link>
                  </td>
                  <td className='main-table-td-td'>
                    {volume ? volume.toFixed(1) : '0.0'}
                  </td>
                </tr>
                <tr>
                  <td className='main-table-td'>
                   <Link to='/Terms'> Top Gainers</Link>
                  </td>
                  <td className='top-gainers-table'>
                    <table cellSpacing='0' cellPadding='0'>
                      <thead>
                        <tr>
                          <th><Link to='/Terms'>Symbol</Link></th>
                          <th><Link to='/Terms'>Price</Link></th>
                          <th><Link to='/Terms'>Change</Link></th>
                        </tr>
                      </thead>
                      <tbody>
                        {topGainers && topGainers.map((tg, index) => {
                          const { symbol, price, change} = tg;
                          return (
                            <tr key={`top-gainers-data-row-${index}`}>
                              <td><Link to='/Terms'>{symbol}</Link></td>
                              <td>{price ? price.toFixed(2) : 0.0}</td>
                              <td>{change ? change.toFixed(2) : 0.0} <img className='uparrow-image' src={change >= 0 ? uparrow : downarrow} /></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td className='main-table-td'>
                   <Link to='/Terms'>Top Loosers</Link>
                    </td>
                  <td className='top-gainers-table'>
                    <table cellSpacing='0' cellPadding='0'>
                      <thead>
                        <tr>
                         <th><Link to ='/Terms'>Symbol</Link></th>
                          <th><Link to ='/Terms'>Price</Link></th>
                          <th><Link to='Terms'>Change</Link></th>
                        </tr>
                      </thead>
                      <tbody>
                        {topLosers && topLosers.map((tg, index) => {
                          const { symbol, price, change} = tg;
                          return (
                            <tr key={`top-gainers-data-row-${index}`}>
                              <td><Link to='/Terms'>{symbol}</Link></td>
                              <td>{price ? price.toFixed(2) : 0.0}</td>
                              <td>{change ? change.toFixed(2) : 0.0}
                              <img className='uparrow-image' src={change >= 0 ? uparrow : downarrow} /></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Dashboard;