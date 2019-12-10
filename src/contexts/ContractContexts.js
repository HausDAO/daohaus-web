import React, { useState, useEffect, createContext } from 'react';

import Web3 from 'web3';
import { useWeb3Context } from 'web3-react';

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
  const context = useWeb3Context();
  
  useEffect(() => {
    const setUp = async () => {

      const web3Service = new Web3Service(context.library || new Web3(
            new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
          ));
      setWeb3(web3Service);
    };
    setUp();
  }, [context]);
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
