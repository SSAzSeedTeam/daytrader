import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Portfolio from './components/TradingAndPortfolios/Portfolio/Portfolio';
import NewOrder from './components/TradingAndPortfolios/NewOrder/NewOrder';

const AppRouter = () => {
  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
    
      <Switch>
        <Route path="/Portfolio" component={Portfolio} exact />
        <Route path="/NewOrder" component={NewOrder} exact />
      </Switch>
    </Router>
  )
}

export default AppRouter