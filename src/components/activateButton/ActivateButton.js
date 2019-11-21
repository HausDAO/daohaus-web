import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Context } from 'web3-react';
import IconEthereum from '../../assets/icon__ethereum.png';

import './ActivateButton.scss';

const ActivateButton = props => {
  const msg = props.msg || '';
  const context = useWeb3Context();

  const activate = async () => {
    await context.setConnector('MetaMask');
  };
  return (
    <>
      {context.error && (
        <>
          <button
            onClick={() =>
              alert('You need a browser with web3 support on mainnet.')
            }
          >
            Sign in with Ethereum
          </button>

          {context.error.code === 'UNSUPPORTED_NETWORK' && (
            <p className="ErrorText">Unsupported network: please use mainnet</p>
          )}
        </>
      )}
      {(context.active || (context.error && context.connectorName)) && (
        <>
          <Link to={`/profile/${context.account}`}>Profile</Link>
        </>
      )}
      {!context.active && !context.error && (
        <button className="AuthButton" onClick={() => activate()}>
          {msg ? (
            <span>{msg}</span>
          ) : (
            <span>
              <img src={IconEthereum} alt="eth logo" /> Sign in with Ethereum
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default ActivateButton;
