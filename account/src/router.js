import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Account from './components/TradingAndPortfolios/Account/Account'

const AppRouter = () => {
  return (
    <Router >
      <Switch>
        <Route path="/Account" component={Account} exact />


      </Switch>
    </Router>
  )
}

export default AppRouter