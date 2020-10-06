import React from 'react'
import Navbar from '../shared/Navbar/Navbar'
import Footer from '../shared/Footer/Footer'
import './configuration.css'
import { Link } from 'react-router-dom';

const ConfigurationComponent = () => {
  return (
    <div className='configuration-app-container'>
      <Navbar />
      <div className='configuration-content'>
        <table cellPadding="0" cellSpacing="0" className='config-util-suite-table'>
          <tr className='table-header'>
            <th colSpan="2">Configuration Utilities</th>
          </tr>
          <tr className='table-second-header'>
            <th>Benchmark Configuration Tools</th>
            <th>Description</th>
          </tr>
          <tr>
            <td ><a><Link to="/reset">Reset DayTrader(to be done before each run)</Link></a></td>
            <td>Reset the DayTrader runtime to a clean starting point by logging off all users, removing new registrations and other general cleanup. For consistent results this URL should be run <b>before each</b> Trade run.</td>
          </tr>
          <tr>
            <td><a><Link to="/configure">Configure DayTrader run-time parameters</Link></a></td>
            <td>This link provides an interface to set configuration parameters that control DayTrader run-time characteristics such as using EJBs or JDBC. This link also provides utilities such as setting the UID and Password for a remote or protected database when using JDBC.</td>
          </tr>
          <tr>
            <td><a><Link to="/recreate">(Re)-create  DayTrader Database Tables and Indexes</Link></a></td>
            <td>This link is used to (a) initially create or (b) drop and re-create the DayTrader tables.<b> A DayTrader database should exist before doing this action,</b> the existing DayTrader tables, if any, are dropped, then new tables and indexes are created.<b> Please stop and re-start the Daytrader application (or your application server) after this action and then use the "Repopulate DayTrader Database" link below to repopulate the new database tables.</b></td>
          </tr>
          <tr>
            <td><a><Link to='/RePopulatedata'>(Re)-populate  DayTrader Database</Link></a></td>
            <td>This link is used to initially populate or re-populate the DayTrader database with fictitious users (uid:0, uid:1, ...) and stocks (s:0, s:1, ...). First all existing users and stocks are deleted (if any). The database is then populated with a new set of DayTrader users and stocks. This option does not drop and recreate the Daytrader db tables.</td>
          </tr>

          <tr>
            <td><a><Link to="/version">DayTrader Version</Link></a></td>
            <td>DayTrader application version and change history information</td>
          </tr>
        </table>
      </div>
      <Footer />
    </div>


  )
}
export default ConfigurationComponent
