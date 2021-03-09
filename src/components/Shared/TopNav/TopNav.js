import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DaohausIcon from '../../../assets/daohaus__brand--castle.svg';
import DaohausLogo from '../../../assets/logo.png';
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
        <img src={DaohausLogo} alt="DaoHaus Logo" />
      </Link>
      <nav className="TopNav__Desktop">
        <a
          href={`https://app.daohaus.club/explore`}
          alt="Explore DAOs"
          rel="noreferrer noopener"
          target="_blank"
        >
          Explore DAOs
        </a>
        <a
          href={`https://app.daohaus.club/summon`}
          alt="Summon a new DAO"
          rel="noreferrer noopener"
          target="_blank"
        >
          Summon a DAO
        </a>
        <a
          href="https://docs.daohaus.club"
          rel="noopener noreferrer"
          target="_blank"
        >
          Help
        </a>
        <a
          href="https://app.daohaus.club"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            src={DaohausIcon}
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
          <a
            href={`https://app.daohaus.club/explore`}
            alt="Explore DAOs"
            rel="noreferrer noopener"
            target="_blank"
          >
            Explore DAOs
          </a>
          <a
            href={`https://app.daohaus.club/summon`}
            alt="Summon a new DAO"
            rel="noreferrer noopener"
            target="_blank"
          >
            Summon a DAO
          </a>
          <a
            href="https://docs.daohaus.club"
            rel="noopener noreferrer"
            target="_blank"
          >
            Help
          </a>
          <a
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
