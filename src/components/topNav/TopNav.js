import React from "react";
import { Link } from 'react-router-dom';
import { useWeb3Context } from 'web3-react'

import ActivateButton from "../../components/activateButton/ActivateButton";
import './TopNav.scss';
import Brand from '../../assets/logo.png';
const TopNav = () => {
  const context = useWeb3Context()

  return (
    <header className="TopNav">
      <Link to={`/`} className="Brand" href="/" alt="DAOHaus Home">
        <img src={Brand} />
        </Link>
      <ActivateButton />
    </header>
  );
};

export default TopNav;
