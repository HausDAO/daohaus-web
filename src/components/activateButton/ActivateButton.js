import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Context } from 'web3-react';
import IconEthereum from '../../assets/icon__ethereum.png';

import './ActivateButton.scss';

const ActivateButton = () => {
  const context = useWeb3Context();
  console.log(context);

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

<<<<<<< HEAD
  if (!context.active && !context.error) {
    // loading
    return (
      <button className="AuthButton" onClick={() => activate()}>
        <img src={IconEthereum} alt="Ethereum"/> Sign in<span> with Ethereum</span>
      </button>
    );
  } else if (context.error) {
    //error
    return (
      <>
        <button onClick={() => alert('You need a browser with web3 support on mainnet.')}>Sign in with Ethereum</button>

        {context.error.code === "UNSUPPORTED_NETWORK" && (
          <p className="ErrorText">Unsupported network: please use mainnet</p>
        )}
      </>
    );
  } else {
    // success
    return (
      <>
        {context.account ? (
=======
          {context.error.code === 'UNSUPPORTED_NETWORK' && (
            <p className="ErrorText">Unsupported network: please use mainnet</p>
          )}
        </>
      )}
      {(context.active || (context.error && context.connectorName)) && (
        <>
>>>>>>> a1459107dfb11824974d0fa92b156a5282f4803b
          <Link to={`/profile/${context.account}`}>Profile</Link>
        </>
      )}
      {!context.active && !context.error && (
        <button className="AuthButton" onClick={() => activate()}>
          <img src={IconEthereum} alt="eth logo" /> Sign in<span> with Ethereum</span>
        </button>
      )}
    </>
  );
};

export default ActivateButton;
