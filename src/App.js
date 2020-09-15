import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Routes from './Routes';
import TopNav from './components/Shared/TopNav/TopNav';
// import NotificationBar from './components/Shared/NotificationBar/NotificationBar';
import ContractContexts from './contexts/ContractContexts';
import { resolvers } from './util/resolvers';
import { ExploreContextProvider } from './contexts/ExploreContext';
import { SummonContextProvider } from './contexts/SummonContext';
import { asciiLog } from './util/blood-and-guts';
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
      <SummonContextProvider>
        <ContractContexts>
          <ExploreContextProvider>
            <div className="App">
              <Router>
                {/* <NotificationBar /> */}
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
