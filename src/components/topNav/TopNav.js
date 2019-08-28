import React from "react";
import { Link } from "react-router-dom";
import ActivateButton from "../../components/activateButton/ActivateButton";

import "./TopNav.scss";
import Brand from "../../assets/logo.png";
const TopNav = () => {
  return (
    <header className="TopNav">
      <Link to={`/`} className="Brand" href="/" alt="DAOHaus Home">
        <img src={Brand} alt="DAOHAUS" />
      </Link>
      <ActivateButton />
    </header>
  );
};

export default TopNav;
