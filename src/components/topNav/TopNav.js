import React from "react";
import { Link } from 'react-router-dom';
import { useWeb3Context } from 'web3-react'

import ActivateButton from "../../components/activateButton/ActivateButton";

const TopNav = () => {
  const context = useWeb3Context()

  return (
    <header className="App-header">
      <Link to={`/`}><h1>DAOHAUS</h1></Link>
      <ActivateButton />
      {context.account ? (
        <Link to="/profile">Profile</Link>
      ): null}
    </header>
  );
};

export default TopNav;
