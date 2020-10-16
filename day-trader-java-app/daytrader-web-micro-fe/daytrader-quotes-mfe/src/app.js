import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Quotes from './quotes/quotes'
const QuotesApp = () => {
  return (
    <Router>
      <Route path="/trading/quotes" component={Quotes} />
    </Router>
  );
}

export default QuotesApp;
