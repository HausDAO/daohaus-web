import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { resolvers } from './util/resolvers';

import Routes from './Routes';
import TopNav from './components/Shared/TopNav/TopNav';
import { asciiLog } from './util/blood-and-guts';

import { ExploreContextProvider } from './contexts/ExploreContext';

import supportedChains from './util/chains';

import './styles/global.scss';
import './App.css';

const chainData = supportedChains[+process.env.REACT_APP_NETWORK_ID];

const client = new ApolloClient({
  uri: chainData.subgraph_url,
  clientState: {
    resolvers,
  },
});

function App() {
  asciiLog();

  return (
    <ApolloProvider client={client}>
      <ExploreContextProvider>
        <div className="App">
          <Router>
            <TopNav />
            <Routes />
          </Router>
        </div>
      </ExploreContextProvider>
    </ApolloProvider>
  );
}

export default App;
