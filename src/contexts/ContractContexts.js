import React, { useState, useEffect, createContext } from 'react';

import Web3 from 'web3';

import Web3Service from '../util/web3Service';

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const WethContext = createContext();
export const DaiContext = createContext();
export const TokenContext = createContext();

const ContractContexts = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [token, setToken] = useState();
  const [moloch, setMoloch] = useState();

  useEffect(() => {
    const setUp = async () => {
      let _web3;

      // console.log(
      //   'Web3.givenProvider.networkVersion',
      //   Web3.givenProvider.networkVersion,
      // );

      if (
        Web3.givenProvider &&
        Web3.givenProvider.networkVersion === process.env.REACT_APP_NETWORK_ID
      ) {
        //console.log('reg web3', Web3.givenProvider);

        _web3 = new Web3(Web3.givenProvider);
        // if(_web3.eth.givenProvider){
        //   _web3 = new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI)

        // }
      } else {
        console.log('net web3');
        _web3 = new Web3(
          new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
        );
      }
      const web3Service = new Web3Service(_web3);
      setWeb3(web3Service);
    };
    setUp();
  }, []);
  return (
    <Web3Context.Provider value={[web3, setWeb3]}>
      <MolochContext.Provider value={[moloch, setMoloch]}>
        <TokenContext.Provider value={[token, setToken]}>
          {children}
        </TokenContext.Provider>
      </MolochContext.Provider>
    </Web3Context.Provider>
  );
};

export default ContractContexts;
