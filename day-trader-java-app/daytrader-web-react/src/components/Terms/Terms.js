import React from 'react'
import Navbar from '../shared/Navbar/Navbar'
import Footer from '../shared/Footer/Footer'

const TermsComponent = () => {
  return (
    <div className='app-home-container'>
      <Navbar />
      <div className='app-home-content' style={{width: '97%'}}>
      <h>Trade Glossary and Terms</h>
      <ul className='terms-bullet-list'><li><b>account ID</b> - A unique Integer based key. Each user is assigned an account ID at account creation time.</li>
        <li><b>account Created</b> - The time and date the users account was first created.</li>
        <li><b>cash balance</b> - The current cash balance in the users account. This does not include current stock holdings.</li>
        <li><b>company</b> - The full company name for an individual stock.</li>
        <li><b>current gain/loss</b> - The total gain or loss of this account, computed by substracting the current sum of cash/holdings minus the opening account balance.</li>
        <li><b>current price</b> - The current trading price for a given stock symbol.</li>
        <li><b>gain/loss</b> - The current gain or loss of an individual stock holding, computed as (current market value - holding basis).</li>
        <li><b>last login</b> - The date and time this user last logged in to Trade.</li>
        <li><b>market value</b> - The current total value of a stock holding, computed as (quantity * current price).</li>
        <li><b>number of holdings</b> - The total number of stocks currently owned by this account.</li>
        <li><b>open price</b> - The price of a given stock at the open of the trading session.</li>
        <li><b>opening balance</b> - The initial cash balance in this account when it was opened.</li>
        <li><b>order id</b> - A unique Integer based key. Each order is assigned an order ID at order creation time.</li>
        <li><b>order status</b> - orders are opened, processed, closed and completed. Order status shows the current stat for this order.</li>
        <li><b>price range</b> - The low and high prices for this stock during the current trading session</li>
        <li><b>purchase date</b> - The date and time the a stock was purchased.</li>
        <li><b>purchase price</b> - The price used when purchasing the stock.</li>
        <li><b>purchase basis</b> - The total cost to purchase this holding. This is computed as (quantity * purchase price).</li>
        <li><b>quantity</b>- The number of stock shares in the order or user holding.</li>
        <li><b>session created</b> - An HTTP session is created for each user at during login. Session created shows the time and day when the session was created.</li>
        <li><b>sum of cash/holdings</b> - The total current value of this account. This is the sum of the cash balance along with the value of current stock holdings.</li>
        <li><b>symbol</b> - The symbol for a Trade stock.</li>
        <li><b>total logins</b> - The total number of logins performed by this user since the last Trade Reset.</li>
        <li><b>total logouts</b> - The total number of logouts performed by this user since the last Trade Reset.</li>
        <li><b>total of holdings</b> - The current total value of all stock holdings in this account given the current valuation of each stock held.</li>
        <li><b>Top gainers</b> - The list of stock gaining the most in price during the current trading session.</li>
        <li><b>Top losers</b> - The list of stock falling the most in price during the current trading session.</li>
        <li><b>Trade Stock Index (TSIA)</b> - A computed index of the top 20 stocks in Trade.</li>
        <li><b>Trading Volume</b> - The total number of shares traded for all stocks during this trading session.</li>
        <li><b>txn fee</b> - The fee charged by the brokerage to process this order.</li>
        <li><b>type</b> - The order type (buy or sell).</li>
        <li><b>user ID</b> - The unique user ID for the account chosen by the user at account registration.</li>
        <li><b>volume</b> - The total number of shares traded for this stock.</li>
      </ul>
    </div>
  </div>
  )
}

export default TermsComponent
