import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import FAQ from './components/faq/faq';
import PrimitiveComponent from './components/primitives/primitives';
import configuration from './components/configuration/configuration'
import Dashboard from './components/TradingAndPortfolios/Home';
import Terms from './components/Terms/Terms';
import TermsComponent from './components/Terms/Terms';
import Account from './components/TradingAndPortfolios/Account/Account';
import Portfolio from './components/TradingAndPortfolios/Portfolio/Portfolio';
import QuotesOrTrade from './components/TradingAndPortfolios/QuotesOrTrade/QuotesOrTrade';
import NewOrder from './components/TradingAndPortfolios/NewOrder/NewOrder';
import CompletedOrder from './components/TradingAndPortfolios/NewOrder/CompletedOrder';
import RePopulatedata from './components/configuration/RePopulatedata';
import RecreateDatabaseComponent from './components/configuration/RecreateDatabaseComponent';
import ConfigureDatabaseComponent from './components/configuration/ConfigureDatabaseComponent';
import DaytraderVersionDatabaseComponent from './components/configuration/DaytraderVersionDatabaseComponent';
import ResetDatabaseComponent from './components/configuration/ResetDatabaseComponent'
import Navbar from './components/shared/Navbar/Navbar';
import Footer from './components/shared/Footer/Footer';

const AppRouter = () => {
  return (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/faq" component={FAQ} exact />
        <Route path="/primitives" component={PrimitiveComponent} exact />
        <Route path="/configuration" component={configuration} exact />
        <Route path="/TradingAndPortfolios" component={Dashboard} exact />
        <Route path="/Terms" component={Terms} exact />
        <Route path="/Account" component={Account} exact />
        <Route path="/Portfolio" component={Portfolio} exact />
        <Route path="/QuotesOrTrade" component={QuotesOrTrade} exact />
        <Route path="/NewOrder" component={NewOrder} exact />
        <Route path="/CompetedOrder" component={CompletedOrder} exact />
        <Route path="/Repopulatedata" component={RePopulatedata} exact />
        <Route path="/ReCreate" component={RecreateDatabaseComponent} exact />
        <Route path="/configure" component={ConfigureDatabaseComponent} exact />
        <Route
          path="/version"
          component={DaytraderVersionDatabaseComponent}
          exact
        />
        <Route path="/reset" component={ResetDatabaseComponent} exact />

      </Switch>
      <Footer />
    </Router>
  )
}

export default AppRouter