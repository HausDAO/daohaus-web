import React, { useState, useEffect, createContext } from 'react';

import Web3 from 'web3';
import { useWeb3Context } from 'web3-react';

import Web3Service from '../util/web3Service';
import ApolloClient from 'apollo-boost';

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const TokenContext = createContext();
export const MolochV2Context = createContext();

const ContractContexts = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [token, setToken] = useState();
  const [moloch, setMoloch] = useState();

  console.log(
    'process.env.REACT_APP_GRAPH_V2_URI',
    process.env.REACT_APP_GRAPH_V2_URI,
  );
  const [MolochV2, setMolochV2] = useState({
    client: new ApolloClient({
      uri: process.env.REACT_APP_GRAPH_V2_URI,
      // clientState: {
      //   resolvers,
      // },
    }),
  });

  const context = useWeb3Context();

  useEffect(() => {
    const setUp = async () => {
      const web3Service = new Web3Service(
        context.library ||
          new Web3(
            new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI),
          ),
      );
      setWeb3(web3Service);
    };
    setUp();
  }, [context]);
  return (
    <Web3Context.Provider value={[web3, setWeb3]}>
      <MolochContext.Provider value={[moloch, setMoloch]}>
        <MolochV2Context.Provider value={[MolochV2, setMolochV2]}>
          <TokenContext.Provider value={[token, setToken]}>
            {children}
          </TokenContext.Provider>
        </MolochV2Context.Provider>
      </MolochContext.Provider>
    </Web3Context.Provider>
  );
};

export default ContractContexts;
