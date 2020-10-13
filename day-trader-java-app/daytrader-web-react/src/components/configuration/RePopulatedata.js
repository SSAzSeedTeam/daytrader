import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';

const quotesBuildlimit = 10;
const TradeBuildlimit = 50;
const maxQuoutesLimit = 400;
const maxTradeLimit = 200
class RePopulatePage extends Component {
  constructor() {
    super()
    this.state = {
      quotesBuildDB: false,
      TradeBuildDB: false,
      message: '',
      messageTwo: ''
    }
  }

  async componentDidMount () {
    let content = '';
    let contentTwo = ''
    for (let offset = 0; offset <= maxQuoutesLimit; offset += quotesBuildlimit) {
      await axios.post(`https://localhost:2443/admin/quotesBuildDB?limit=${quotesBuildlimit}&offset=${offset}`).
        then(res => {
          console.log('res', content)
          content += `....s${offset}`
          if ((offset / 10) % 10 === 0 && offset > 0) {
            content += '<br />'
          }
          this.setState({
            quotesBuildDB: true,
            message: content
          })
        })
    }
    for (let offset = 0; offset < maxTradeLimit; offset += TradeBuildlimit) {
      await axios.post(`https://localhost:2443/admin/tradeBuildDB?limit=${TradeBuildlimit}&offset=${offset}`).
        then(async res => {
          console.log('res', res)
          await axios.get(`https://localhost:3443/portfolios/uid:${offset}/holdings`).
            then(res => {
              const holdings = res.data
              contentTwo += `Account# ${offset} User ID=${offset} has ${holdings.length} holdings`
              contentTwo += '<br />'
              this.setState({
                TradeBuildDB: res.data,
                messageTwo: contentTwo
              })
            })
        })
    }

  }
  render() {
    const {quotesBuildDB, TradeBuildDB, messageTwo, message} = this.state;
    return (
      <div>
        <Navbar />
        <div className='config-content-container'>{quotesBuildDB ? <div className='content' dangerouslySetInnerHTML={{__html: message}} /> : ''}</div>
        <div className='config-content-container'>{TradeBuildDB ? <div>
          <div>TradeBuildDB: **** Registering 200 Users ****</div>
          <div className='content' dangerouslySetInnerHTML={{__html: messageTwo}} />
          </div> : ''}</div>
        <Footer />
      </div>
    )
  }
}

export default RePopulatePage;
