import React, { useState } from "react";
import "./configureDtabase.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import { LOCAL_GATEWAY_URL } from '../../constants';

const ConfigureDatabaseComponent = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [select, setSelect] = useState(false);

  const handleChange = (event) => {
    setSelect(!select);
  };

  const onClickUpdateConfig = async (updateConfigFormValue) => {
    const { REACT_APP_DAYTRADER_GATEWAY_SERVICE = LOCAL_GATEWAY_URL } = process.env
    return await axios.post(
      `${REACT_APP_DAYTRADER_GATEWAY_SERVICE}/admin/recreateDBTables`,
      updateConfigFormValue
    );
  };
  return (
    <div className="recreate-container">
      <Navbar />
      <div className="rc-top-container"></div>
      <form onSubmit={handleSubmit(onClickUpdateConfig)}>
        <div className="recreate-table-data-container">
          <table className="recreate-table">
            <tr className="table-header">
              <td>DayTrader configuration</td>
              <td>DayTrader</td>
            </tr>
          </table>
          <div className="current-day-trader-heading">
            Current DayTrader configuration
          </div>
          <table class="main-heading-table">
            <thead>
              <tr align="center">
                <th>
                  The current DayTrader runtime configuration is detailed below.
                  View and optionally update run-time parameters. NOTE:
                  Parameters settings will return to default on server restart.
                  To make configuration settings persistent across application
                  server stop/starts,edit the servlet init parameters for each
                  DayTrader servlet. This is described in the DayTrader FAQ.
                </th>
              </tr>
            </thead>
          </table>
          <table class="recreate-config-table">
            <tr>
              <td>
                <b>Run-Time Mode</b>
                <br />
                <input
                  type="radio"
                  name="RunTimeMode"
                  value="Full"
                  ref={register}
                />{" "}
                Full EJB3
                <br />
                <input
                  type="radio"
                  name="RunTimeMode"
                  checked
                  ref={register}
                  value="Direct"
                />{" "}
                Direct (JDBC)
                <br />
                <input
                  type="radio"
                  name="RunTimeMode"
                  value="Session"
                  ref={register}
                />{" "}
                Session (EJB3) To Direct
              </td>
              <td>
                Run Time Mode determines server implementation of the
                TradeServices to use in the DayTrader application Enterprise
                Java Beans including Session, Entity and Message beans or Direct
                mode which uses direct database and JMS access. See DayTrader
                FAQ for details.
              </td>
            </tr>
            <tr>
              <td>
                <b>JPA Layer</b>
                <br />
                <input
                  ref={register}
                  type="radio"
                  defaultValue="OpenJPA"
                  name="JPA Layer"
                  checked
                />{" "}
                OpenJPA
                <br />
                <input ref={register} type="radio" name="JPA Layer" /> Hibernate
                <br />
              </td>
              <td>
                JPA Layer determines what kind of JPA Implementation Daytrader
                EJB classes use. Typically, Apache Geronimo uses OpenJPA, and
                RedHat JBoss 5 uses Hibernate.
              </td>
            </tr>
            <tr>
              <td>
                <b>Order-Processing Mode</b>
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="Synchronous"
                  name="Order-Processing Mode"
                  checked
                />{" "}
                Synchronous
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="Asynchronous_2-Phase"
                  name="Order-Processing Mode"
                />{" "}
                Asynchronous_2-Phase
                <br />
              </td>
              <td>
                Order Processing Mode determines the mode for completing stock
                purchase and sell operations. Synchronous mode completes the
                order immediately. Asychronous_2-Phase performs a 2-phase commit
                over the EJB Entity/DB and MDB/JMS transactions. See DayTrader
                FAQ for details.
              </td>
            </tr>
            <tr>
              <td>
                <b>Scenario Workload Mix</b>
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="Standard"
                  name="Scenario Workload Mix"
                  checked
                />{" "}
                Standard
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="High-Volume"
                  name="Scenario Workload Mix"
                />{" "}
                High-Volume
                <br />
              </td>
              <td>
                This setting determines the runtime workload mix of DayTrader
                operations when driving the benchmark through
                TradeScenarioServlet. See DayTrader FAQ for details.
              </td>
            </tr>
            <tr>
              <td>
                <b>WebInterface</b>
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="JSP"
                  name="WebInterface"
                  checked
                />{" "}
                JSP
                <br />
                <input
                  ref={register}
                  type="radio"
                  value="JSP-Images"
                  name="WebInterface"
                />{" "}
                JSP-Images
                <br />
              </td>
              <td>
                This setting determines the Web interface technology used, JSPs
                or JSPs with static images and GIFs.
              </td>
            </tr>
          </table>
          <table class="table table-bordered" style={{ marginTop: 20 }}>
            <thead>
              <tr align="center">
                <th>Miscellaneous Settings</th>
              </tr>
            </thead>
          </table>
          <table class="recreate-config-table-two">
            <thead>
              <tr>
                <td>
                  <b>DayTrader Max Users</b>
                  <br />
                  <input
                    ref={register}
                    size="25"
                    type="text"
                    name="MaxUsers"
                    defaultValue="200"
                  />
                  <br />
                  <b>Trade Max Quotes</b>
                  <br />
                  <input
                    ref={register}
                    size="25"
                    type="text"
                    name="MaxQuotes"
                    defaultValue="400"
                  />
                  <br />
                </td>
                <td>
                  By default the DayTrader database is populated with 200 users
                  (uid:0 - uid:199) and 400 quotes (s:0 - s:399).
                </td>
              </tr>
              <tr>
                <td>
                  <b>Market Summary Interval</b>
                  <br />
                  <input
                    ref={register}
                    size="25"
                    type="text"
                    name="MarketSummaryInterval"
                    defaultValue="200"
                  />
                  <br />
                </td>
                <td>
                  {"< "}0 Do not perform Market Summary Operations. = 0 Perform
                  market Summary on every request.
                  {">"} 0 number of seconds between Market Summary Operations
                </td>
              </tr>
              <tr>
                <td>
                  <b>Primitive Iteration</b>
                  <br />
                  <input
                    ref={register}
                    size="25"
                    type="text"
                    name="PrimitiveIteration"
                    defaultValue="2"
                  />
                  <br />
                </td>
                <td>
                  By default the DayTrader primitives are execute one operation
                  per web request. Change this value to repeat operations
                  multiple times per web request.
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    ref={register}
                    type="checkbox"
                    name="PublicQuoteUpdates"
                  />
                  <b>
                    <font size="-1">Publish Quote Updates</font>
                  </b>
                </td>
                <td>Publish quote price changes to a JMS topic.</td>
              </tr>
              <tr>
                <td>
                  <input
                    ref={register}
                    type="checkbox"
                    checked
                    name="EnableLongRunSupport"
                  />
                  <b>
                    <font size="-2">Enable long run support</font>
                  </b>
                </td>
                <td>
                  Enable long run support by disabling the show all orders query
                  performed on the Account page.
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    ref={register}
                    type="checkbox"
                    name="EnableOperationTrace"
                  />
                  <b>
                    <font size="-2">Enable operation trace</font>
                  </b>
                  <br />
                  <input
                    ref={register}
                    type="checkbox"
                    name="EnableFullTrace"
                  />
                  <b>
                    <font size="-2">Enable full trace</font>
                  </b>
                </td>
                <td>Enable DayTrader processing trace messages</td>
              </tr>
              <tr>
                <td colspan="2" align="right">
                  <button type="submit">Update Config</button>
                </td>
              </tr>
            </thead>
          </table>
          <table className="recreate-table">
            <tr className="table-header">
              <td>DayTrader configuration</td>
              <td>DayTrader</td>
            </tr>
          </table>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default ConfigureDatabaseComponent;
