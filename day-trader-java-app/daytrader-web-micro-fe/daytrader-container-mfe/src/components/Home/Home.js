import React from 'react'
import Navbar from '../shared/Navbar/Navbar'
import overviewImage from '../../assets/DayTraderArchitecture.png'
import './Home.css'
import { Link } from 'react-router-dom'
import Footer from '../shared/Footer/Footer'

const Home = () => {
  return (
    <div className='app-home-container'>
      <Navbar />
      <div className='app-home-content'>
        <h4 className='heading'>Overview</h4>
        <p>
          The Geronimo<sup>TM</sup> performance benchmark sample provides a suite of Apache developed workloads for characterizing performance of the Geronimo J2EE Application Server. The workloads consist of an end to end web application and a full set of primitives. The applications are a collection of Java classes, Java Servlets, Java Server Pages, Web Services, and Enterprise Java Beans built to open J2EE APIs. Together these provide versatile and portable test cases designed to measure aspects of scalability and performance.
        </p>
        <div className='overview-image'>
          <img src={overviewImage} />
        </div>
        <div className='mvc-info'>
          <h4>DayTrader Microservices Components</h4>
          <div className='desc-info'>
            <h5>DayTrader</h5>
            <p>DayTrader is the Geronimo end-to-end benchmark and performance sample application. The new DayTrader benchmark has been re-designed and developed to cover Geronimo's significantly expanding programming model. This provides a real world workload driving Geronimo's implementation of J2EE 1.4 and Web Services including key Geronimo performance components and features.</p>
            <p>DayTrader's new design spans J2EE 1.4 including the new EJB 2.1 component architecture, Message Driven beans, transactions (1-phase, 2-phase commit) and Web Services (SOAP, WSDL).</p>
          </div>
          <div className='desc-info'>
            <h5>Primitives</h5>
            <p>The <Link to='/primitives'>Primitives</Link> provide a set of workloads to individually test various components of the Geronimo Application Server. The primitives leverage the DayTrader application infrastructure to test specific Geronimo J2EE components such as the servlet engine, JSP support, EJB Entitiy, Session and Message Driven beans, HTTP Session support and more.</p>
            <p>Additional overview information is included in the <Link to='/faq'>FAQ</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;