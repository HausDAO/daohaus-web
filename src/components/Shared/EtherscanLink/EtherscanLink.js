import React from 'react';

const EtherscanLink = ({ txHash }) => {
  const uri =
    process.env.REACT_APP_NETWORK_ID === '1'
      ? 'https://etherscan.io/tx/'
      : 'https://kovan.etherscan.io/tx/';

  return (
    <div className="EtherscanLink">
      <a href={`${uri}${txHash}`} target="_blank" rel="noopener noreferrer">
        View on Etherscan
      </a>
    </div>
  );
};

export default EtherscanLink;
