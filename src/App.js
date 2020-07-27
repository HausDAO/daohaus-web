import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Routes from './Routes';
import TopNav from './components/Shared/TopNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';
import { ExploreContextProvider } from './contexts/ExploreContext';
import { SummonContextProvider } from './contexts/SummonContext';

import './styles/global.scss';
import './App.css';
import { asciiLog } from './util/helpers';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SUPERGRAPH_URL,
  clientState: {
    resolvers,
  },
});

function App() {
  asciiLog();

  return (
    <ApolloProvider client={client}>
      <SummonContextProvider>
        <ContractContexts>
          <ExploreContextProvider>
            <div className="App">
              <Router>
                <TopNav />
                <Routes />
              </Router>
            </div>
          </ExploreContextProvider>
        </ContractContexts>
      </SummonContextProvider>
    </ApolloProvider>
  );
}

export default App;
