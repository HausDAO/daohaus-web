import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


import Routes from './Routes';
import TopNav from './components/topNav/TopNav';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';

import './global.scss';
import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_SUPERGRAPH_URL,
  clientState: {
    resolvers,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ContractContexts>
        <div className="App">
          <Router>
            <TopNav />
            <Routes />
          </Router>
        </div>
      </ContractContexts>
    </ApolloProvider>
  );
}

export default App;
