import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { ImTwitter } from 'react-icons/im';
import { DiGithubAlt } from 'react-icons/di';

import GraphicCommunities from '../../assets/graphic__communities.png';
import HausHugeType from '../../assets/haus__hugeType.png';

import IconA from '../../assets/ico-grants.png';
import IconB from '../../assets/ico-protocols.png';
import IconC from '../../assets/ico-guilds.png';
import IconD from '../../assets/ico-clubs.png';
import IconFA from '../../assets/ico__future--a.png';
import IconFB from '../../assets/ico__future--b.png';
import IconFC from '../../assets/ico__future--c.png';
import IconHA from '../../assets/ico__how--a.png';
import IconHB from '../../assets/ico__how--b.png';
import IconHC from '../../assets/ico__how--c.png';

import { ReactComponent as DiscordSvg } from '../../assets/branding/Discord.svg';
import { ReactComponent as SubstackSvg } from '../../assets/Substack.svg';
import DaohausLogo from '../../assets/logo.png';

import './Community.scss';

const Community = () => {
  return (
    <div className="Home">
      <div className="Block PrimaryDark">
        <div className="Block__Contents">
          <h1>The HAUS doesn't build itself</h1>
          <p className="BigP daoColor" style={{ maxWidth: '500px' }}>
            As we create more value together, that value flows back to the HAUS
            token, shared by all DAOs on the platform.
          </p>
          <div className="HeroButtonGroup">
            <a
              href="https://daohaus.club/help"
              className="Button Big Secondary Outlined"
            >
              Get HAUS
            </a>
            <a
              href="https://app.daohaus.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="Button Big"
            >
              FarmHaus
            </a>
          </div>
        </div>
      </div>

      <div className="Block PrimaryBg">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <h2 style={{ textDecoration: 'strikethrough' }}>
                The HAUS CCO is Open!
              </h2>
              <p className="BigP">
                A CCO, or ‘Community Contribution Opportunity’, is exactly that.
                An opportunity for the community to contribute capital or work
                in exchange for the community’s token (HAUS in our case)
              </p>
              <p className="yellowColor">
                We’ve scraped every DAO contract known to man. You should be
                eligible if you have ever interacted with a DAO.
              </p>
              <div className="HeroButtonGroup">
                <a
                  href="https://daohaus.club/help"
                  className="Button Secondary Outlined"
                >
                  What's a CCO?
                </a>
                <a
                  href="https://app.daohaus.club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Button"
                >
                  Get HAUS
                </a>
              </div>
            </div>
            <div className="Column--50"></div>
          </div>
        </div>
      </div>
      <div className="Usecases Block">
        <div className="Block__Contents">
          <h3>What is HAUS used for?</h3>
          <p>
            How HAUS is used <span className="daoColor">TODAY</span>
          </p>
          <div className="Row">
            <div className="Column--50">
              <img src={IconA} alt="" width="80px" />
              <h5>Governance</h5>
              <p>
                Define, direct, and build the product for and with the
                community. Also supports sustainable governance over the HAUS
                token and its issuance.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconB} alt="" width="80px" />
              <h5>Access</h5>
              <p>
                Get priority support and alpha access to new features on DAOhaus
              </p>
            </div>
            <div className="Column--50">
              <img src={IconC} alt="" width="80px" />
              <h5>Rewards</h5>
              <p>
                Earn rewards by providing liquidity to the community to build
                more value into the platform.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconD} alt="" width="80px" />
              <h5>Discounts</h5>
              <p>
                Get discounts on advanced or custom features by paying with
                HAUS.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 75 }}>
            How HAUS will be used <span className="yellowColor">TOMORROW</span>
          </p>
          <div className="Row">
            <div className="Column--33">
              <div className="Row AlignCenter JustifyStart">
                <img
                  src={IconFA}
                  alt=""
                  width="40px"
                  style={{ marginRight: '10px' }}
                />
                <p>
                  Self-organized
                  <br />
                  <strong>User Union</strong>
                </p>
              </div>
            </div>
            <div className="Column--33">
              <div className="Row AlignCenter JustifyStart">
                <img
                  src={IconFB}
                  alt=""
                  width="40px"
                  style={{ marginRight: '10px' }}
                />
                <p>
                  Curated DAO
                  <br />
                  <strong>Index Fund</strong>
                </p>
              </div>
            </div>
            <div className="Column--33">
              <div className="Row AlignCenter JustifyStart">
                <img
                  src={IconFC}
                  alt=""
                  width="40px"
                  style={{ marginRight: '10px' }}
                />
                <p>
                  Seed Early
                  <br />
                  <strong>Communities</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <h5>Hello Meta Governance</h5>
              <h3>UberHaus</h3>
              <p className="BigP">
                UberHaus is the DAO that governs the DAOhaus product as well as
                the HAUS token. As DAOhaus is a platform for communities, there
                are no individual members, only the communities themselves. Any
                DAO can stake some HAUS and elect a delegate to represent them
                in UberHaus governance proposals.
              </p>
              <div className="ButtonGroup">
                <a
                  href="https://app.daohaus.club/explore"
                  className="Button Outlined"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join as a DAO
                </a>
                <a
                  href="https://app.daohaus.club/explore"
                  className="Button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit UberHaus
                </a>
              </div>
            </div>
            <div className="Column--50">
              <img src={GraphicCommunities} alt="dao communities" />
            </div>
          </div>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <h3>How HAUS governance works</h3>
          <p>Just the basics, more to come.</p>
          <div className="Row">
            <div className="Column--33" style={{ marginTop: 75 }}>
              <img src={IconHA} alt="" width="40px" />
              <h5>1. Discuss</h5>
              <p>
                Discuss new directions and features for the product or new
                use-cases and strategies for the HAUS token itself.
              </p>
              <a
                className="Button Outlined"
                href="discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on Discord
              </a>
            </div>
            <div className="Column--33" style={{ marginTop: 75 }}>
              <img src={IconHB} alt="" width="40px" />
              <h5>2. Propose</h5>
              <p>
                Anyone can submit a proposal to the DAO. We can also collect
                signal from all tokenholders via Snapshot to help inform.
              </p>
              <a
                className="Button Outlined"
                href="discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Propose on Discourse
              </a>
            </div>
            <div className="Column--33" style={{ marginTop: 75 }}>
              <img src={IconHC} alt="" width="40px" />
              <h5>3. Vote</h5>
              <p>
                The Member DAOs vote directly on the proposals, governing the
                platform themselves.
              </p>
              <a
                className="Button Outlined"
                href="discord.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vote in the DAO
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="Block PrimaryDark">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <img src={HausHugeType} alt="" />
              <h3 className="whiteColor" style={{ margin: '75px 0px 25px' }}>
                Our mission is to foster a diverse, open economy of transparent
                collaboration.
              </h3>
              <p className="BigP">
                DAOhaus is built and run by the community using DAOs to
                coordinate.
              </p>
            </div>
            <div className="Column--50"></div>
          </div>

          <div className="Row" style={{ marginTop: 75 }}>
            <div className="Column--33 SocialItem">
              <a
                href="https://discord.gg/NPEJysW"
                target="_blank"
                rel="noopener noreferrer"
                className="SocialIcon"
              >
                <Icon component={DiscordSvg} />
              </a>
              <h4 className="tradColor">Discord</h4>
              <p>Get support, provide feedback, ask anything about DAOs.</p>
            </div>
            <div className="Column--33 SocialItem">
              <a
                href="https://daohaus.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="SocialIcon"
              >
                <Icon component={SubstackSvg} />
              </a>
              <h4 className="yellowColor">Substack</h4>
              <p>
                Get the alpha while it's still alpha. Stay up to date and learn
                what’s on the horizon.
              </p>
            </div>
            <div className="Column--33 SocialItem">
              <a
                href="https://github.com/HausDAO/pokemol-web"
                target="_blank"
                rel="noopener noreferrer"
                className="SocialIcon"
              >
                <DiGithubAlt />
              </a>
              <h4 className="daoColor">Github</h4>
              <p>
                Check the code, it's open-source of course. Add an issue, submit
                a PR.
              </p>
            </div>
          </div>
        </div>
      </div>
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
              <Link to="/help">How to DAO</Link>
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
    </div>
  );
};

export default Community;
