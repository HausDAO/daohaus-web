import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Connectors } from 'web3-react';
import Web3Provider from 'web3-react';
import Web3 from 'web3';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

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
  uri: process.env.REACT_APP_SUPERGRAPH_URL,
  clientState: {
    resolvers,
  },
});

console.log(process.env.NODE_ENV);
const history = createBrowserHistory();
if (process.env.NODE_ENV === 'production') {
  const trackingId = 'UA-132344680-2';
  ReactGA.initialize(trackingId);
  history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });
}

function App() {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    >
      <ApolloProvider client={client}>
        <ContractContexts>
          <div className="App">
            <Router history={history}>
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
