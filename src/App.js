import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';

import Routes from './Routes';
import TopNav from './components/topNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';
import { get } from './util/requests';

import './global.scss';
import './App.css';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1] });

const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_INFURA_URI,
});

const connectors = { MetaMask, Infura };

const cache = new InMemoryCache({
  // freezeResults: true,
});

const typeDefs = gql`
  type ApiDao {
    id: Int!
    name: String!
  }
  type Query {
    apiDao: ApiDao!
  }
`;

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_URI,
  cache,
  clientState: {
    typeDefs,
    resolvers,
    // defaults: { apiDaos: [] },
  },
  // assumeImmutableResults: true,
});

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`);
      console.log('daoRes', daoRes);
      // const cache = new InMemoryCache({ addTypename: false });

      cache.writeData({
        data: {
          apiDaos: daoRes.data.map(dao => {
            return {
              id: dao.contractAddress,
              name: dao.name,
              __typename: 'ApiDao',
            };
          }),
        },
        // data: {
        //   apiDaos: daoRes.data.map(dao => {
        //     dao.__typename = 'apiDao';
        //     return dao;
        //   }),
        // },
      });
      console.log('cache', cache);
    };

    fetchData();
  }, []);

  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'ethers.js' | 'web3.js' | null}
    >
      <ApolloProvider client={client}>
        <ContractContexts>
          {' '}
          <div className="App">
            <Router>
              <TopNav />
              <Routes />
            </Router>
          </div>
        </ContractContexts>
      </ApolloProvider>
    </Web3Provider>
  );
}

export default App;
