import React, { useState } from "react";
import "./resetDatabase.css";

import Footer from "../shared/Footer/Footer";
import { Link } from "react-router-dom";

const RecreateDatabaseComponent = () => {
    return (
        <div className="recreate-container">
            <div className="rc-top-container"></div>

            <div className="recreate-table-data-container">
                <table className="recreate-table">
                    <tr className="table-header">
                        <td>DayTrader Scenario Runtime Statisticss</td>
                        <td>DayTrader</td>
                    </tr>
                </table>
                <div className="current-day-trader-heading">
                    Trade Reset completed successfully
        </div>

                <table class="recreate-config-table">
                    <tr>
                        <td>Benchmark runtime configuration summary</td>
                        <td>Value</td>
                    </tr>
                    <tr>
                        <td> <Link to="/terms">Run-Time Mode</Link></td>
                        <td>Direct (JDBC)</td>
                    </tr>
                    <tr>
                        <td><Link to="/terms">Order-Processing Mode</Link></td>
                        <td>Synchronous</td>
                    </tr>

                    <tr>
                        <td><Link to="/terms">Scenario Workload Mix</Link></td>
                        <td>Standard</td>
                    </tr>
                    <tr>
                        <td><Link to="/terms">Web Interface</Link></td>
                        <td>JSP</td>
                    </tr>
                    <tr>
                        <td><Link to="/terms">Active Traders / Trade User population</Link></td>
                        <td>200 / 200</td>
                    </tr>
                    <tr>
                        <td><Link to="/terms">Active Stocks / Trade Stock population</Link></td>
                        <td>400 / 410</td>
                    </tr>
                </table>
                <table class="table table-bordered" style={{ marginTop: 20 }}>
                    <thead>
                        <tr align="center">
                            <th> Benchmark scenario verification</th>
                        </tr>
                    </thead>
                </table>

                <table class="recreate-config-table-two">

                    <tr>
                        <td>
                            <b>Run Statistic</b>
                        </td>
                        <td>Scenario verification test</td>
                        <td>Expected Value</td>
                        <td>Actual Value</td>
                        <td>Pass/Fail</td>
                    </tr>


                    <tr>
                        <td>
                            <b><Link to="/terms">Active Traders</Link></b>
                        </td>
                        <td>
                            Active traders should generally equal the db population of
                            traders
                       </td>
                        <td>200</td>
                        <td>200</td>
                        <td>Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Estimated total requests</Link></b>
                        </td>
                        <td>
                            Actual benchmark scenario requests should be within +/- 2% of
                            the estimated number of requests in the last benchmark run to
                            pass.
              </td>
                        <td>0.0</td>
                        <td>see2</td>
                        <td>see2</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">New Users Registered</Link></b>
                        </td>
                        <td>2.0% of expected requests (0.02 * 0.0 )</td>
                        <td>0.0</td>
                        <td>0</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Logins</Link></b>
                        </td>
                        <td>4.0% of expected requests (0.04 * 0.0 ) + initial login</td>
                        <td>200.0</td>
                        <td>200</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Logouts</Link></b>
                        </td>
                        <td>
                            #logouts must be {">"}= #logins-active traders ( 0 - 200 )
              </td>
                        <td>-200</td>
                        <td>0</td>
                        <td>Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Active Stocks</Link></b>
                        </td>
                        <td>
                            Active stocks should generally equal the db population of stocks
              </td>
                        <td>410</td>
                        <td>400</td>
                        <td>Warn</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">User Holdings</Link></b>
                        </td>
                        <td>
                            Trade users own an average of 5 holdings, 5* total Users = ( 5 *
                            200)
              </td>
                        <td>1000</td>
                        <td>1063</td>
                        <td>+6.299999999999997% Fail4</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Buy Order Count</Link></b>
                        </td>
                        <td>
                            4.0% of expected requests (0.04 * 0.0 ) + current holdings count
              </td>
                        <td>1063.0</td>
                        <td>1063</td>
                        <td>0.0% Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Sell Order Count</Link></b>
                        </td>
                        <td>4.0% of expected requests (0.04 * 0.0 )</td>
                        <td>0.0</td>
                        <td>0</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Total Order Count</Link></b>
                        </td>
                        <td>
                            8.0% of expected requests (0.08 * 0.0 ) + current holdings count
              </td>
                        <td>1063.0</td>
                        <td>1063</td>
                        <td>0.0% Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Open Orders</Link></b>
                        </td>
                        <td>All orders should be completed before reset3</td>
                        <td>0</td>
                        <td>0</td>
                        <td>Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Cancelled Orders</Link></b>
                        </td>
                        <td>
                            Orders are cancelled if an error is encountered during order
                            processing.
              </td>
                        <td>0</td>
                        <td>0</td>
                        <td>Pass</td>
                    </tr>
                    <tr>
                        <td>
                            <b><Link to="/terms">Orders remaining after reset</Link></b>
                        </td>
                        <td>
                            After Trade reset, each user should carry an average of 5 orders
                            in the database. 5* total Users = (5 * 200)
              </td>
                        <td>1000</td>
                        <td>1063</td>
                        <td>+6.299999999999997% Fail4</td>
                    </tr>

                </table>

                <table class="main-heading-table">
                    <thead>
                        <tr align="center">
                            Benchmark scenario statistics
              <ol>
                                <li>
                                    Benchmark verification tests require a Trade Reset between
                                    each benchmark run.
                </li>
                                <li>
                                    The expected value of benchmark requests is computed based on
                                    the the count from the Web application since the last Trade
                                    reset.The actual value of benchmark request requires user
                                    verification and may be incorrect for a cluster.
                </li>
                                <li>
                                    Orders are processed asynchronously in Trade. Therefore,
                                    processing may continue beyond the end of a benchmark run.
                                    Trade Reset should not be invoked until processing is
                                    completed.
                </li>
                                <li>
                                    Actual values must be within 5% of corresponding estimated
                                    values to pass verification.
                </li>
                            </ol>
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

            <Footer />
        </div>
    );
};
export default RecreateDatabaseComponent;
