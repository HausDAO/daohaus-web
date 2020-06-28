import React, {useContext} from 'react';
import Web3Modal from 'web3modal';

import { Link } from 'react-router-dom';

import IconEthereum from '../../assets/icon__ethereum.png';

import './ActivateButton.scss';
import { getChainData } from '../auth/chains';
import { w3connect, providerOptions } from '../auth/Auth';
import { Web3Context } from '../../contexts/ContractContexts';

const ActivateButton = props => {
  const msg = props.msg || '';
  const [web3Service] = useContext(Web3Context);


  const activate = async () => {
    const web3Connect = new Web3Modal({
      network: getChainData(+process.env.REACT_APP_NETWORK_ID).network, // optional
      providerOptions, // required
      cacheProvider: true,
    });
    try {
      await w3connect(web3Connect);
    } catch (err) {
      console.log('error activating', err);
      
    }

    
  };
  return (
    <>
      {/* {context.error && (
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
      {context.active && (
        <>
          <Link to={`/profile/${context.account}`}>Profile</Link>
        </>
      )} */}
      {true && (
        <button onClick={() => activate()}>
          {msg ? (
            <span>{msg}</span>
          ) : (
            <>
              <img src={IconEthereum} alt="eth logo" /> Sign in<span className="HideMobile">{' '}with Ethereum</span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default ActivateButton;
