import React from 'react';

import Icon from '@ant-design/icons';
import { ImTwitter } from 'react-icons/im';
import { DiGithubAlt } from 'react-icons/di';
import { ReactComponent as DiscordSvg } from '../../../assets/branding/Discord.svg';
import { ReactComponent as SubstackSvg } from '../../../assets/Substack.svg';
import DaohausLogo from '../../../assets/logo.png';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="Block Footer">
      <div className="Block__Contents">
        <div className="Row">
          <div className="Column Column--25">
            <img
              src={DaohausLogo}
              alt="DaoHaus Logo"
              height="40px !important"
            />
            <p className="Built">
              Built by community via{' '}
              <a
                href="https://app.daohaus.club/dao/0x64/0x283bdc900b6ec9397abb721c5bbff5ace46e0f50"
                target="_blank"
                rel="noopener noreferrer"
              >
                HausDAO
              </a>
            </p>
          </div>
          <div className="Column Column--25">
            <a
              href="https://app.daohaus.club"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch the App
            </a>
            <a
              href="https://app.daohaus.club/explore"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore DAOs
            </a>
            <a
              href="https://app.daohaus.club/summon"
              target="_blank"
              rel="noopener noreferrer"
            >
              Summon a new DAO
            </a>
            <a
              href="https://docs.daohaus.club"
              target="_blank"
              rel="noopener noreferrer"
            >
              DAO Basics
            </a>
          </div>
          <div className="Column Column--25">
            <a
              href="https://twitter.com/nowdaoit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImTwitter /> Twitter
            </a>
            <a
              href="https://discord.gg/NPEJysW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={DiscordSvg} /> Discord
            </a>
            <a
              href="https://daohaus.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={SubstackSvg} /> Substack
            </a>

            <a
              href="https://github.com/HausDAO/pokemol-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiGithubAlt /> Github
            </a>
          </div>
          <div className="Column Column--25"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
