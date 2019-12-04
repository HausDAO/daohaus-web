import React from 'react';
import Loader from '../../assets/loader.gif';
import EtherscanLink from '../etherscanLink/EtherscanLink';

const Loading = props => {
  const msg = props.msg || 'Loading';
  const txHash = props.txHash;

  return (
    <div className="Loading">
      <img src={Loader} alt="Loading" />
      <h5>{msg}</h5>
      {txHash ? <EtherscanLink txHash={txHash} /> : null}
    </div>
  );
};

export default Loading;
