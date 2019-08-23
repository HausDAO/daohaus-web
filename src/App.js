import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes';
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
