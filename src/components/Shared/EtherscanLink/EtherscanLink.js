import React from 'react';

const EtherscanLink = ({ txHash }) => {
  const uri = () => {
    switch (process.env.REACT_APP_NETWORK_ID) {
      case '1': {
        return 'https://etherscan.io/tx/';
      }
      case '42': {
        return 'https://kovan.etherscan.io/tx/';
      }
      case '4': {
        return 'https://rinkeby.etherscan.io/tx/';
      }
      case '74': {
        return 'https://explorer.idchain.one/tx/';
      }
      case '100': {
        return 'https://blockscout.com/poa/xdai/tx/';
      }
      default: {
        return 'https://etherscan.io/tx/';
      }
    }
  };

  return (
    <div className="EtherscanLink">
      <a href={`${uri()}${txHash}`} target="_blank" rel="noopener noreferrer">
        View on{' '}
        {process.env.REACT_APP_NETWORK_ID === '100'
          ? 'Blockscout'
          : process.env.REACT_APP_NETWORK_ID === '74'
          ? 'IDChain Explorer'
          : 'Etherscan'}
      </a>
    </div>
  );
};

export default EtherscanLink;
