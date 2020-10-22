import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AccountsPage from './accounts/accounts'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/trading/accounts" component={AccountsPage} exact />
      </Switch>
    </Router>
  )
}

export default AppRouter