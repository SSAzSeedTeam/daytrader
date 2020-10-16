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
import Terms from './components/Terms/Terms';
import RePopulatedata from './components/configuration/RePopulatedata';
import RecreateDatabaseComponent from './components/configuration/RecreateDatabaseComponent';
import ConfigureDatabaseComponent from './components/configuration/ConfigureDatabaseComponent';
import DaytraderVersionDatabaseComponent from './components/configuration/DaytraderVersionDatabaseComponent';
import ResetDatabaseComponent from './components/configuration/ResetDatabaseComponent'
import Navbar from './components/shared/Navbar/Navbar';
import Footer from './components/shared/Footer/Footer';
import TradingHome from './components/trading/trading';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/faq" component={FAQ} exact />
        <Route path="/primitives" component={PrimitiveComponent} exact />
        <Route path="/configuration" component={configuration} exact />
        <Route path="/Terms" component={Terms} exact />
        <Route path="/trading" component={TradingHome} exact />
        <Route path="/Repopulatedata" component={RePopulatedata} exact />
        <Route path="/ReCreate" component={RecreateDatabaseComponent} exact />
        <Route path="/configure" component={ConfigureDatabaseComponent} exact />
        <Route path="/version" component={DaytraderVersionDatabaseComponent} exact />
        <Route path="/reset" component={ResetDatabaseComponent} exact />
      </Switch>
      <Footer />
    </Router>
  )
}

export default AppRouter