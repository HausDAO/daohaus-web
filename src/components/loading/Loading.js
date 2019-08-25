import React from 'react';
import Loader from '../../assets/loader.gif';

const Loading = () => (
  <div className="Loading">
    <img src={Loader} alt="Loading" />
    <h5>Processing</h5>
  </div>
);

export default Loading;