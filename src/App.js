import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';
import Web3 from 'web3';

import Routes from './Routes';
import TopNav from './components/topNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';

import './global.scss';
import './App.css';

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({
  supportedNetworks: [+process.env.REACT_APP_NETWORK_ID],
});

const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_INFURA_URI,
});

const connectors = { MetaMask, Infura };

const client = new ApolloClient({
  // uri: process.env.REACT_APP_GRAPH_URI,
  uri: process.env.REACT_APP_SUPERGRAPH_URL,
  clientState: {
    resolvers,
  },
});

const v2Client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_V2_URI,
  clientState: {
    resolvers,
  },
});

function App() {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    >
      <ApolloProvider client={client}>
        <ContractContexts v2Client={v2Client}>
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
