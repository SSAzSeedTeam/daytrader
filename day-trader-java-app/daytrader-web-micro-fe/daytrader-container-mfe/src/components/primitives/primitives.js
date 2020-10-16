import React from 'react'
import Navbar from '../shared/Navbar/Navbar'
import Footer from '../shared/Footer/Footer'
import './primitives.css'

const PrimitiveComponent = () => {
  return (
    <div className='primitive-app-container'>
      <Navbar />
      <div className='primitive-content'>
        <h4 className='heading'>Web Primitive Tests</h4>
        <table cellPadding="0" cellSpacing="0" className='test-suite-table'>
          <tr>
            <th>Primitive Test Suite</th>
          </tr>
          <tr>
            <td>
              The Geronimo performance benchmark sample provides a suite of web primitives. These primitives singularly test key operations in the enterprise Java programming model. Links to each of the web primitive tests are provided below along with a description of each operation.
              <br />Note that some primitives below can have their main operations repeated. These operations are marked with a red *. In order to adjust the repetition, change the primitive iteration value in the Trade configuration page.
            </td>
          </tr>
        </table>
        <table cellPadding="0" cellSpacing="0" className='container-ping-suite-table'>
          <tr>
            <th colSpan="2">Web Container ping suite</th>
          </tr>
          <tr>
            <td>
              <a>PingHtml</a>
            </td>
            <td>
              PingHtml is the most basic operation providing access to a simple "Hello World" page of static HTML.
            </td>
          </tr>
          <tr>
            <td>
              <a>Explicit GC</a>
            </td>
            <td>
              Invoke Garbage Collection on AppServer. Reports heap statistics after the GC has completed.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServlet</a>
            </td>
            <td>
              PingServlet tests fundamental dynamic HTML creation through server side servlet processing.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServletWriter</a>
            </td>
            <td>
              PingServletWriter extends PingServlet by using a PrintWriter for formatted output vs. the output stream used by PingServlet.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServlet2Include*</a>
            </td>
            <td>
              PingServlet2Include tests response inclusion. Servlet 1 includes the response of Servlet 2.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServlet2Servlet</a>
            </td>
            <td>
              PingServlet2Servlet tests request dispatching. Servlet 1, the controller, creates a new JavaBean object forwards the request with the JavaBean added to Servlet 2. Servlet 2 obtains access to the JavaBean through the Servlet request object and provides dynamic HTML output based on the JavaBean data.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingJSP</a>
            </td>
            <td>
              PingJSP tests a direct call to JavaServer Page providing server-side dynamic HTML through JSP scripting.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingJSPEL</a>
            </td>
            <td>
              PingJSPEL tests a direct call to JavaServer Page providing server-side dynamic HTML through JSP scripting and the usage of the new JSP 2.0 Expression Language.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServlet2JSP</a>
            </td>
            <td>
              PingServlet2JSP tests a commonly used design pattern, where a request is issued to servlet providing server side control processing. The servlet creates a JavaBean object with dynamically set attributes and forwards the bean to the JSP through a RequestDispatcher The JSP obtains access to the JavaBean and provides formatted display with dynamic HTML output based on the JavaBean data.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingHTTPSession1</a>
            </td>
            <td>
              PingHTTPSession1 - SessionID tests fundamental HTTP session function by creating a unique session ID for each individual user. The ID is stored in the users session and is accessed and displayed on each user request.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingHTTPSession2</a>
            </td>
            <td>
              PingHTTPSession2 session create/destroy further extends the previous test by invalidating the HTTP Session on every 5th user access. This results in testing HTTPSession create and destroy
            </td>
          </tr>
          <tr>
            <td>
              <a>PingHTTPSession3</a>
            </td>
            <td>
              PingHTTPSession3 large session object tests the servers ability to manage and persist large HTTPSession data objects. The servlet creates a large custom java object. The class contains multiple data fields and results in 2048 bytes of data. This large session object is retrieved and stored to the session on each user request.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingJDBCRead*</a>
            </td>
            <td>
              PingJDBCRead tests fundamental servlet to JDBC access to a database performing a single-row read using a prepared SQL statment.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingJDBCWrite*</a>
            </td>
            <td>
              PingJDBCRead tests fundamental servlet to JDBC access to a database performing a single-row write using a prepared SQL statment.
            </td>
          </tr>
          <tr>
            <td>
              <a>PingServlet2JNDI*</a>
            </td>
            <td>
              PingServlet2JNDI tests the fundamental J2EE operation of a servlet allocating a JNDI context and performing a JNDI lookup of a JDBC DataSource.
            </td>
          </tr>
        </table>
      </div>
      <Footer />
    </div>
  )
}

export default PrimitiveComponent