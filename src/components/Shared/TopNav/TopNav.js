import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Brand from '../../../assets/logo.png';
import DaohausCastle from '../../../assets/daohaus__brand--castle--light.png';
import './TopNav.scss';

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
        <Link to={`/about`} alt="DAOHaus About">
          About
        </Link>
        <Link to={`/help`} alt="DAOHaus Help">
          Help
        </Link>
        <a
          className="Button"
          style={{ color: 'white' }}
          href="https://app.daohaus.club"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src={DaohausCastle}
            width="36px"
            height="36px"
            style={{ marginRight: '10px' }}
            alt="daohaus castle icon"
          />
          Open App
        </a>
      </nav>
      {/* Start Hamburger */}
      <button className={hamburgerClass} type="button" onClick={toggleNav}>
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
          <a
            className="Button"
            style={{ color: 'white' }}
            href="https://app.daohaus.club"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open App
          </a>
        </div>
      </div>
      {/* End Hamburger */}
    </header>
  );
};

export default TopNav;
