import React from 'react'
import Footer from '../shared/Footer/Footer'
import Navbar from '../shared/Navbar/Navbar'
import './faq.css'

const FAQ = () => {
  return (
    <div className='faq-page-container'>
      <Navbar />
      <div className='faq-content'>
        <h4>Frequently Asked Questions</h4>
        <p>The Apache Software Foundation® DayTrader Performance Benchmark Sample provides a suite of workloads for characterizing performance of J2EE 1.4 Application Servers. The workloads consist of an end-to-end Web application and a full set of Web primitives. The applications are a collection of JavaTM classes, Java servlets, Java ServerPagesTM (JSPTM) files and Enterprise JavaBeansTM (EJBTM) built to open Java 2 Platform, Enterprise Edition (J2EETM) APIs. Together, the Trade application and Web primitives provide versatile and portable test cases that are designed to measure aspects of scalability and performance.</p>
        <div className='faq-questions'>
          <h4 className='blue-heading'>Application Design</h4>
          <h5>What is DayTrader?</h5>
          <p>DayTrader is an end-to-end Web application that is modeled after an on-line stock brokerage. DayTrader leverages J2EE components such as servlets, JSP files, enterprise beans, message-driven beans (MDBs) and Java database connectivity (JDBCTM) to provide a set of user services such as login/logout, stock quotes, buy, sell, account details, and so on through standards-based HTTP and Web services protocols.</p>
          <h5>What are Web Primitives?</h5>
          <p>The Web primitives leverage the DayTrader infrastructure to test specific features of the Application Servers implementing the J2EE 1.4 programming model. A description of each of the Web primitives is provided on the main web primitive page.</p>
          <h5>What software is required to run DayTrader?</h5>
          <ul>
            <li>Any J2EE 1.4 Compliant Application Server</li>
            <li>A database that has a suitable JDBC driver for both XA and non-XA connectivity.</li>
          </ul>
          <h5>What are the most common configuration scenarios?</h5>
          <ul>
            <li><b>Single server with a remote database</b> - The DayTrader application runs on a stand alone WebSphere Application Server instance. The required database software and the associated Trade database are located on a different system from the Application Server. The Application Server system must have the necessary database client software to connect to the remote database.</li>
            <li><b>Single server with a local database</b> - Same as the previous scenario; however, the required database software and the associated DayTrader database are located on the same system as the Application Server.</li>
          </ul>
        </div>
        <div className='faq-questions'>
          <h4 className='blue-heading'>Run-time Configuration</h4>
          <h5>What does the ResetDayTrader link do?</h5>
          <p>The ResetDayTrader link on the configuration page must be clicked between DayTrader runs. This link sets the database to a consistent size by removing all the newly registered users created during a DayTrader run. The reset also sets all outstanding orders to a consistent state. Resetting the database to a consistent size ensures repeatable throughput on subsequent DayTrader runs.</p>
          <h5>How are the DayTrader configuration parameters modified?</h5>
          <p>The Trade configuration page provides a dynamic mechanism to set the run-time configuration for a DayTrader run. These settings control the application run-time characteristics such as the run-time mode, the order processing mode, and other run-time variations supported in DayTrader. All settings are reset to defaults when the DayTrader application server is restarted.</p>
          <h5>Can you make configuration changes permanent?</h5>
          <p>Yes. Normally, Trade configuration parameters return to defaults whenever the Trade application server is restarted. Settings can be made permanent by setting the configuration values in the servlet init parameters of the TradeApp servlet and the TradeScenario servlet. Modify the servlet init parameters in the web.xml file of the Trade Web application to change these parameters.</p>
          <h5>What are the run-time modes?</h5>
          <p>DayTrader provides two server implementations of the emulated DayTrader brokerage services.</p>
          <ul>
            <li>
              <b>EJB</b> - Database access uses EJB 2.1 technology to drive transactional trading operations.
            </li>
            <li>
              <b>Direct</b> - This mode uses database and messaging access through direct JDBC and JMS code.
            </li>
          </ul>
          <h5>What are the order processing modes?</h5>
          <p>DayTrader provides an asynchronous order processing mode through messaging with MDBs. The order processing mode determines the mode for completing stock purchase and sell operations. Synchronous mode completes the order immediately. Asynchronous mode uses MDB and JMS to queue the order to a TradeBroker agent to complete the order. Asychronous_2-Phase performs a two-phase commit over the EJB database and messaging transactions.</p>
          <ul>
            <li>
              <b>Synchronous</b> - Orders are completed immediately by the DayTrader session enterprise bean and entity enterprise beans.
            </li>
            <li>
              <b>Asynchronous 2-phase</b> - Orders are queued to the TradeBrokerMDB for asynchronous processing.
            </li>
          </ul>
          <h5>What are the access modes?</h5>
          <p>DayTrader provides multiple access modes to the server-side brokerage services.</p>
          <ul>
            <li>
              <b>Standard</b> - Servlets access the Trade enterprise beans through the standard RMI protocol
            </li>
            <li>
              <b>WebServices</b> - Servlets access DayTrader services through the Web services implementation in the System Under Test (SUT). Each trading service is available as a standard Web service through the SOAP Remote Procedure Call (RPC) protocol. Because DayTrader is wrapped to provide SOAP services, each DayTrader operation (login, quote, buy, and son on) is available as a SOAP service.
            </li>
          </ul>
          <h5>What is the Primitive Iteration setting?</h5>
          <p>By default, the DayTrader primitives run one operation per Web request. Setting this value alters the number of operations performed per client request. This is useful for reducing the amount of work that is performed by the Web Container and for stressing other components within the application server.</p>
        </div>
        <div className='faq-questions'>
          <h4 className='blue-heading'>
            Benchmarking
          </h4>
          <h5>What is the TradeScenario servlet?</h5>
          <p>The TradeScenario servlet provides a simple mechanism to drive the DayTrader application. The Trade database is initially populated with a set of fictitious users with names ranging from uid:0 to uid:49 and a set of stocks ranging from s:0 to s:99. The TradeScenario servlet emulates a population of Web users by generating a specific DayTrader operation for a randomly chosen user on each access to the URL. To run the TradeScenario servlet use the single TradeScenario URL (http://hostname/daytrader/scenario) with a load generation tool.</p>
          <p>Although TradeScenario servlet provides a simple mechanism for driving the DayTrader application, there is a drawback to using this method versus using a series of load generation scripts that drive the operations directly. This servlet consumes processing resources on the server to manage incoming clients and dispatch these simple client requests to complex Trade actions. This action artificially decreases server throughput because the server is emulating tasks that are normally performed by a standard client or a more complex load generation tool.</p>
          <h5>What is the typical procedure for collecting performance measurements with DayTrader?</h5>
          <p>When DayTrader is successfully installed on the application server and the supporting database is populated, you can us the DayTrader application to collect performance measurements. The following list provides the typical process for gathering performance measurements with DayTrader.</p>
          <ol>
            <li>
              Select the DayTrader run-time configuration parameters from the configuration page (EJB, synchronous, and so on).
            </li>
            <li>
              Reset the DayTrader run-time using the Reset DayTrader link.
            </li>
            <li>
              Warm-up the application server JVMTM by applying load for a short period of time. The load generation tool may access the TradeScenario servlet, web primitives, or use custom scripts to drive the various operations of TradeApp servlet. To warm-up the JVM, each code path within DayTrader must be processed enough times to esnure that the JIT compiler has compiled and optimzed the application and server paths; generally, about 3000 iterations should do the trick. Remember that the same code path is not necessarily run on each request unless primitives are being run. Therefore, perform an adequate number of requests to stabilize the performance results.
            </li>
            <li>
              Stop the load generation tool.
            </li>
            <li>
              Reset the Trade run-time again
            </li>
            <li>
              Restart the load generation tool and record measurements after the driver completes the requests.
            </li>
            <li>
              Repeat steps 5 and 6 to obtain additional measurements.
            </li>
          </ol>
          <h5>Where did DayTrader come from?</h5>
          <p>DayTrader was originally an application designed by IBM to test their commercial Application Server. The application was designed around common development patterns as well as to use the majority of the J2EE programming model. The original author was Stan Cox where he developed Trade (the original name) for J2EE 1.3. Since then Stan has evolved Trade and several other individuals have contributed to the project. Christopher Blythe has been instrumental in stabilizing the long running capability of the benchmark and Andrew Spyker introduced the Application Clients. The Application Clients (Streamer and WSAppClient) provide remote capability to validate remote J2EE functionality and database consistency as well as provide a remote WebServices client. Matt Hogstrom has used Trade extensively for performance analysis and brought Trade to the Apache Software Foundation Geronimo Project. He has removed (hopefully) all WebSphere specific items in the application and introduced additional functionality for gathering server compliance information and low-level diagnostic information.</p>
          <h5>Where is it going?</h5>
          <p>Version 1.1 of DayTrader represents the first presentation of the application as an Open Source version for performance and benchmarking. Currently it is focused on J2EE 1.4 but needs to be upgraded to J2EE 1.5. Also, as there is a large number of developers that are not interested in the full J2EE stack, DayTrader needs to be updated to be modular such that only the interesting pieces need to be deployed.</p>
          <p>Also, DayTrader needs to incorporate some additional technology such as Spring and Hibernate for performance testing such that comparisons can be made against competing technologies.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FAQ;
