import React from 'react';
import Loader from '../../assets/loader.gif';

const Loading = props => {
  const msg = props.msg || 'Loading';
  return (
    <div className="Loading">
      <img src={Loader} alt="Loading" />
      <h5>{msg}</h5>
    </div>
  );
};

export default Loading;
