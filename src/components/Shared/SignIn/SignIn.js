import React, { useContext } from 'react';
import Web3Modal from 'web3modal';
import { Link } from 'react-router-dom';

import IconEthereum from '../../../assets/icon__ethereum.png';
import { getChainData } from '../../../util/chains';
import { w3connect, providerOptions, USER_TYPE } from '../../../util/auth';
import { Web3Context } from '../../../contexts/ContractContexts';
import Web3Service from '../../../util/web3-service';

import './SignIn.scss';

const SignIn = props => {
  const msg = props.msg || '';
  const [w3Service, setWeb3Service] = useContext(Web3Context);

  const activate = async () => {
    const web3Connect = new Web3Modal({
      network: getChainData(+process.env.REACT_APP_NETWORK_ID).network, // optional
      providerOptions, // required
      cacheProvider: true,
    });
    try {
      const w3m = await w3connect(web3Connect);
      console.log(w3m.web3);

      const [account] = await w3m.web3.eth.getAccounts();

      const web3Service = new Web3Service(w3m.web3);
      setWeb3Service({ web3Service, account });
      console.log('USER_TYPE.WEB3', w3Service);

      localStorage.setItem('loginType', USER_TYPE.WEB3);
      console.log(localStorage.getItem('loginType'));

      //
    } catch (err) {
      console.log('error activating', err);
    }
  };
  return (
    <>
      {w3Service && w3Service.account ? (
        <>
          <Link to={`/profile/${w3Service.account}`}>Profile</Link>
        </>
      ) : (
        <button onClick={() => activate()} className={msg ? 'Big' : ''}>
          {msg ? (
            <span>{msg}</span>
          ) : (
            <>
              <img src={IconEthereum} alt="eth logo" /> Sign in
              <span className="HideMobile"> with Ethereum</span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default SignIn;
