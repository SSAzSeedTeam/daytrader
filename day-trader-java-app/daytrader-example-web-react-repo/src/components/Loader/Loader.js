import React from 'react';
import loaderImage from '../../assets/loader.gif';
import './Loader.css';

const Loader = () => {
  return (
    <div className='app-loader-conatiner'>
      <div className='app-loader-overlay'>
        <img src={loaderImage} />
      </div>
    </div>
  )
}

export default Loader;
