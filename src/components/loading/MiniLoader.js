import React from 'react';

import EtherscanLink from '../etherscanLink/EtherscanLink';

import './Loading.scss';

const MiniLoader = ({ txHash }) => {
  return (
    <div className="MiniLoader">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#513e97"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(47.9221 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>

      {txHash ? (
        <div className="Loading__link">
          <EtherscanLink txHash={txHash} />
        </div>
      ) : null}
    </div>
  );
};

export default MiniLoader;
