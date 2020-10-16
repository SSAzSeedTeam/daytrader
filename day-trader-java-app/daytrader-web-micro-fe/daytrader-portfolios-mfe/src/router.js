import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PortfolioPage from './portfolio/portfolio';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/trading/portfolio" component={PortfolioPage} exact />
      </Switch>
    </Router>
  )
}

export default AppRouter