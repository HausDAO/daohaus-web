import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import TopNav from './components/Shared/TopNav/TopNav';
import { asciiLog } from './util/blood-and-guts';

import './styles/global.scss';
import './App.css';

function App() {
  asciiLog();

  return (
    <div className="App">
      <Router>
        <TopNav />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
