import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Portfolios from './portfolio/portfolio'
const PortfolioApp = () => {
  return (
    <Router>
      <Route path="/trading/portfolio" component={Portfolios} />
    </Router>
  );
}

export default PortfolioApp;
