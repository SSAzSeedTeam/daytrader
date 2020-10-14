import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home'
import './index.css'

const TradingHome = () => {
  return (
    <div className='app-trading-section'>
      <Home />
    </div>
  )
}

export default TradingHome
