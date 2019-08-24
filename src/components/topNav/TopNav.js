import React from "react";
import { Link } from 'react-router-dom';

import ActivateButton from "../../components/activateButton/ActivateButton";

const TopNav = () => {

  return (
    <header className="App-header">
      <Link to={`/`}><h1>DAOHAUS</h1></Link>
      <ActivateButton />
    </header>
  );
};

export default TopNav;
