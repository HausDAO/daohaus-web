import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';
import { Helmet } from 'react-helmet';

import Routes from './Routes';
import TopNav from './components/topNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';

import Brand from './assets/daohaus__logo.png';
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
  uri: process.env.REACT_APP_GRAPH_URI,
  clientState: {
    resolvers,
  },
});

function App() {
  return (
    <>
      <Helmet>
        <meta property="og:url" content="https://daohaus.club/" />
        <meta property="og:title" content="Daohaus" />
        <meta
          property="og:description"
          content="Explore the
      Haus of Daos. Discover and pledge to join existing daos. Or summon your own."
        />
        <meta property="og:site_name" content="Daohaus" />
        <meta property="og:image" content={Brand} />
      </Helmet>

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
    </>
  );
}

export default App;
