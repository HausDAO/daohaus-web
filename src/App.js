import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';

import Routes from './Routes';
import TopNav from './components/topNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';

import './global.scss';
import './App.css';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

// const MetaMask = new InjectedConnector({ supportedNetworks: [1, 42] });
console.log('REACT_APP_NETWORK_ID', process.env.REACT_APP_NETWORK_ID);
const MetaMask = new InjectedConnector({
  supportedNetworks: [+process.env.REACT_APP_NETWORK_ID],
  // supportedNetworks: [42],
});

const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_INFURA_URI,
});

const connectors = { MetaMask, Infura };

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_URI,
  clientState: {
    resolvers,
  },
});

function App() {
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
