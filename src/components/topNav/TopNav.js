import React, { useState } from "react";
import { Link } from "react-router-dom";
import ActivateButton from "../../components/activateButton/ActivateButton";

import "./TopNav.scss";
import Brand from "../../assets/logo.png";
const TopNav = () => {
  const [navOpen, setNavOpen] = useState(false);

  const hamburgerClass = navOpen
    ? 'navbar__hamburger hamburger hamburger--spin is-active'
    : 'navbar__hamburger hamburger hamburger--spin';

  const mobileNavClass = navOpen
    ? 'TopNav__Mobile TopNav__Mobile--Open'
    : 'TopNav__Mobile';

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <header className="TopNav">
      <Link to={`/`} className="TopNav__Brand" alt="DAOHaus Home">
        <img src={Brand} alt="DAOHAUS" />
      </Link>
      <nav className="TopNav__Desktop">
        <Link to={`/`} alt="DAOHaus Home">
          Home
        </Link>
        <Link to={`/about`} alt="DAOHaus About">
          About
        </Link>
        <Link to={`/help`} alt="DAOHaus Help">
          Help
        </Link>
        <div className="AuthButton">
          <ActivateButton />
        </div>
      </nav>
      {/* Start Hamburger */}
      <button
          className={hamburgerClass}
          type="button"
          onClick={toggleNav}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <div className={mobileNavClass}>
          <div className="TopNav__Mobile--Contents">
            <Link to={`/`} onClick={toggleNav}>
              Home
            </Link>
            <Link to="/about" onClick={toggleNav}>
              About
            </Link>
            <Link to="/help" onClick={toggleNav}>
              Help
            </Link>
            <ActivateButton msg={'Sign in'} />
          </div>
        </div>
        {/* End Hamburger */}
    </header>
  );
};

export default TopNav;
