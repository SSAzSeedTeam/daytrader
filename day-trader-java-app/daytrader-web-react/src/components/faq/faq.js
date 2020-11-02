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
          <p>DayTrader is an end-to-end Microservices based Web application that is modeled after an on-line stock brokerage. DayTrader leverages components such as
          Middleware  Java 8, Spring Boot, Spring MVC.
          FrontEnd   React JS for enhanced UI experience
          Backend  MySQL, Oracle, Derby(in memory)
           to provide a set of user services such as login/logout, stock quotes, buy, sell, account details, and so on through standards-based HTTP and Web services protocols.</p>
          <h5>What are Web Primitives?</h5>
          <p>The Web primitives leverage the DayTrader infrastructure to test specific features of the Application Servers implementing the J2EE 1.4 programming model. A description of each of the Web primitives is provided on the main web primitive page.</p>
          <h5>What software is required to run DayTrader?</h5>
          <ul>
            <li>Docker engine or Kubernetes platform. </li>
            <li>A database</li>
          </ul>
          <h5>What are the most common configuration scenarios?</h5>
          <ul>
            <li><b>Single server with a remote database</b> - The Day Trader application runs on Kubernetes platform (on premise or cloud) as Docker images. The required database software and the associated Trade database are located on a different system from the Application Server. The Application Server system must have the necessary database client software to connect to the remote database(on premise or cloud)
</li>
            <li><b>Single server with a local database</b> - Same as the previous scenario; however, the required database software and the associated DayTrader database are located on the same system as the Application Server.
</li>
          </ul>
        </div>


        <div className='faq-questions'>
          <h4 className='blue-heading'>Administrator Task</h4>
          <h5>What does the ResetDayTrader link do?</h5>
          <p>The ResetDayTrader link on the configuration page must be clicked between DayTrader runs. This link sets the database to a consistent size by removing all the newly registered users created during a DayTrader run. The reset also sets all outstanding orders to a consistent state. Resetting the database to a consistent size ensures repeatable throughput on subsequent DayTrader runs.</p>
          <h5>What are the run-time modes?</h5>
          <p>DayTrader provides two server implementations of the emulated DayTrader brokerage services.</p>
          <ul>
            <li><b>Docker/ Kubernetes</b> - The images created can be run in isolation using a containerized environment using Docker Engine. The interactions between the Microservices can happen by setting Network parameters in Docker Compose.
            </li>
            <li><b>Cloud</b> - This mode uses the image which are self-contained and can be deployed on any Cloud environment <b>(AWS/ AZURE/ GCP etc) </b>using Kubernetes Service.

            </li>
            <li><b>Local</b> - This mode helps in running the application on any local environment where Java8+ is installed. For database, the application can connect to on premise or Cloud service.

            </li>

          </ul>


          <h5>What are the order processing modes?</h5>
          <p>DayTrader provides 2 ways of Order processing. The order processing mode determines the mode for completing stock purchase and sell operations. </p>
          <ul>
            <li><b>Web UI</b> - Orders are completed from the React JS based Web UI by logging in to the account. </li>
            <li><b>Batch Processing</b> - Orders are queued to the topic in Kafka for batch processing.</li>
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
          <h5>Where did DayTrader come from?</h5>
          <p> DayTrader is an MVP application designed for testing online trading features. The application was designed around common development patterns of Microservices Framework as well as to use the majority of the Java and Spring Boot components. The application is dockerized image making PODA (Package Once Deploy Anywhere) enabled.
           The application is Hybrid Cloud enabled and can be deployed on or integrated with multiple cloud providers and on premise applications.</p>
          <h5>Where is it going?</h5>
          <p>Version 1.1 of DayTrader represents the first presentation of the application as an Open Source version for performance and benchmarking.
           DayTrader application will be updated with the latest technology in the market.</p>
        </div>
        <div className='faq-questions'>
          <h4 className='blue-heading'>Questions</h4>
          <h5>What should I look in for an Online Trading Platform?</h5>
          <p>There are numerous online trading platforms available, with various options available. Here are some key points we suggest looking for on any platform you choose:
          You will need a user-friendly platform – are you able to do everything online or will you need to download software?
          The platform should have easy deposit methods, such as e-wallets or Wire Transfers
          Look for a company that offers a high level of personal service and support including live chat, SMS services, and personal training
          Use a company that has a regulatory license for your region
          You will want 24-hour access to your accounts
          There should be various trading tools available including charts, outlooks, financial calendars and news
          Look at the Leverage offered and the cost of renewal/rolling fees for Day Trades
          Be sure there are no hidden costs including commissions on deposits or withdrawals
          Look for a platform with no maintenance margins with fixed rates and stop loss limits
           </p>
          <h5>Which type of Payment method should I use?</h5>
          <p>Currently we support Credit cards.
            Sooner we will be enabling PayPal, Skrill etc as mode of payments.</p>
          <h5>How do I know which stock will go up or down?</h5>
          <p>Stock prices are exceptionally volatile, making them tough to predict. Now, because of this volatility, no system can assure you that any transactions on the foreign currency market will result in significant benefits to you, nor is it possible to guarantee that your transactions will yield favorable results.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FAQ;
