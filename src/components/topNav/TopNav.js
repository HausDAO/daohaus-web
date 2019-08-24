import React from "react";
import ActivateButton from "../../components/activateButton/ActivateButton";
import './TopNav.scss';
import Brand from '../../assets/logo.png';
const TopNav = () => {

  return (
    <header className="TopNav">
      <a className="Brand" href="/" alt="DAOHaus Home">
        <img src={Brand} />
      </a>
      <ActivateButton />
    </header>
  );
};

export default TopNav;
