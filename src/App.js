import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import logo from "./logo.svg";
import "./App.css";

import { Connectors } from 'web3-react'
import Web3Provider from 'web3-react'
const { InjectedConnector, NetworkOnlyConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })

const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...'
})

const connectors = { MetaMask, Infura }



function App() {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'ethers.js'|'web3.js'|null}>
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Routes />
      </Router>
    </div>
     </Web3Provider>
  );
}

export default App;
