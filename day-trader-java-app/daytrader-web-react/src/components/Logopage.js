import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Logopage extends Component{
    render(){
        return(
            <div>
             <p className='company-info'>
            <span>DAY</span>
            <span className='colored-text'>TRADER</span>
            </p>
            <div>
                <button>Home</button>
                <button>Trading&Portfolios</button>
                <button>Configuration</button>
                <button>Primitives</button>
                <button>FAQ</button>
            </div>
            <div>
                <label>Overview</label>
                <div><p>This is about all technologies regarding server pages ejb and all other conceptd</p>
                </div>
                <div>IMAGE</div>
                <div><Link to='/Summary'>Summary</Link>
                </div>
            </div>
            </div>
        )
            
        
    }
}
export default Logopage
