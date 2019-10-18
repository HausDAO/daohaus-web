import React from 'react';
import Loader from '../../assets/loader.gif';

const Loading = () => (
  <div className="Loading">
    <img src={Loader} alt="Loading" />
    <h5>Summoning</h5>
  </div>
);

export default Loading;