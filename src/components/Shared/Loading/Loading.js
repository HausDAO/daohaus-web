import React from 'react';
import Loader from '../../../assets/loader.gif';
import EtherscanLink from '../EtherscanLink/EtherscanLink';

import './Loading.scss';

const Loading = props => {
  const msg = props.msg || 'Loading';
  const txHash = props.txHash;

  return (
    <div className="Loading">
      <img src={Loader} alt="Loading" />
      <h5>{msg}</h5>
      {txHash ? (
        <div className="Loading__link">
          <EtherscanLink txHash={txHash} />
        </div>
      ) : null}
    </div>
  );
};

export default Loading;
