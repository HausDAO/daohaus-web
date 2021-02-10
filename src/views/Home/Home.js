import React from 'react';
import { Carousel } from 'antd';
import Icon, { TwitterCircleFilled, GithubOutlined } from '@ant-design/icons';

import InfographicTrad from '../../assets/infographic__trad.png';
import InfographicDAO from '../../assets/infographic__dao.png';
import GraphicCommunities from '../../assets/graphic__communities.png';
import DaohausBauhaus from '../../assets/daohaus__bauhaus.png';
import DaohausHugeType from '../../assets/daohaus__hugeType.png';

import HowTreasury from '../../assets/how__treasury.png';
import HowProposals from '../../assets/how__proposals.png';
import HowMembers from '../../assets/how__members.png';

import IconA from '../../assets/branding/Icon__A.png';
import IconB from '../../assets/branding/Icon__B.png';
import IconC from '../../assets/branding/Icon__D.png';

import { ReactComponent as DiscordSvg } from '../../assets/branding/Discord.svg';

import DaohausCastle from '../../assets/daohaus__brand--castle.svg';
import DaohausCastleLight from '../../assets/daohaus__brand--castle--light.png';
import GetStartedBackground from '../../assets/daohaus__seciton5-bg-shapes.png';
import FallingBackground from '../../assets/daohaus__hero--falling.png';
import DaohausLogo from '../../assets/logo.png';

import { heroSlides, integrationLogos } from '../../content/home-content';

import './Home.scss';

const Home = () => {
  const renderSlides = () => {
    return (
      <Carousel autoplay={true} dots={false} effect="fade" autoplaySpeed={5000}>
        {heroSlides.map(slide => {
          return (
            <div key={slide.id} className="Carousel__Slide">
              <div className="Content">
                <p>{slide.content}</p>
                <h4>{slide.heading}</h4>
              </div>
              <div
                className="SlideBg"
                style={{
                  backgroundImage: 'url(' + slide.image + ')',
                }}
              />
              <div className="Overlay">
                <img
                  src={DaohausHugeType}
                  alt="daohaus type illustration"
                  width="50%"
                  style={{ position: 'absolute', bottom: 25, right: 25 }}
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    );
  };

  return (
    <>
      <div className="HomeHero">
        <div className="SummonHero">
          <h1>Unlock the next tier in community coordination</h1>
          <p className="BigP" style={{ maxWidth: '500px' }}>
            We believe in power to the people. Join us in pioneering a future
            where communities replace corporations and humans own the web.
            <br />
          </p>
          <div className="HeroButtonGroup">
            <a
              href="https://daohaus.club/about"
              className="Button Big Secondary"
            >
              DAO Basics
            </a>
            <a
              href="https://app.daohaus.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="Button Big"
            >
              <img
                src={DaohausCastleLight}
                alt="DAOhaus Icon"
                width="28px"
                height="28px"
                style={{ verticalAlign: 'middle', marginRight: '5px' }}
              />
              Open App
            </a>
          </div>
        </div>
        <div className="Carousel">{renderSlides()}</div>
      </div>

      <div className="Features Block">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <img src={InfographicDAO} alt="infographic dao" width="240px" />
              <h5>DAO</h5>
              <h2>Power shared by all</h2>
              <p>Agile, Collaboration, Diversity, Transparency</p>
            </div>
            <div className="Column--50">
              <img src={InfographicTrad} alt="infographic trad" width="240px" />
              <h5>Traditional Organization</h5>
              <h2>Power held by few at the top</h2>
              <p>Rigid, Competition, Inequality, Opaque </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Usecases Block">
        <div className="Block__Contents">
          <h3>How is it Used?</h3>
          <p>How communities use DAOhaus today</p>
          <div className="Row">
            <div className="Column--50">
              <img src={IconA} alt="infographic dao" width="80px" />
              <h5>Grants</h5>
              <p>
                The first major use of DAOs has been through community grants!
                Millions have been raised and distributed to early developers of
                this technology.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconB} alt="infographic trad" width="80px" />
              <h5>Ventures</h5>
              <p>
                Freelancers rejoice! Guilds have re-emerged as a powerful
                collective force. Some even have members who quit their day jobs
                to work for a DAO.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconA} alt="infographic dao" width="80px" />
              <h5>Guilds</h5>
              <p>
                Freelancers rejoice! Guilds have re-emerged as a powerful
                collective force. Some even have members who quit their day jobs
                to work for a DAO.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconB} alt="infographic trad" width="80px" />
              <h5>Social</h5>
              <p>
                Freelancers rejoice! Guilds have re-emerged as a powerful
                collective force. Some even have members who quit their day jobs
                to work for a DAO.
              </p>
            </div>
          </div>
          <p>How communities will use DAOs tomorrow</p>
          <div className="Row">
            <div className="Column--33">
              <img src={IconA} alt="infographic dao" width="80px" />
              <p>
                Player-owned
                <br />
                <strong>Games</strong>
              </p>
            </div>
            <div className="Column--33">
              <img src={IconA} alt="infographic dao" width="80px" />
              <p>
                Brewer-owned
                <br />
                <strong>Breweries</strong>
              </p>
            </div>
            <div className="Column--33">
              <img src={IconC} alt="infographic dao" width="80px" />
              <p>
                User-owned
                <br />
                <strong>Platforms</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Block Communities">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <h3>
                We{' '}
                <span role="img" aria-label="Love">
                  ❤️
                </span>{' '}
                Communities
              </h3>
              <p>
                DAOhaus communities have raised over $21m to build, hire and
                invest as one unified voice.{' '}
              </p>
            </div>
            <div className="Column--50">
              <img src={GraphicCommunities} alt="dao communities" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="Row GetStarted"
        style={{ backgroundImage: 'url(' + GetStartedBackground + ')' }}
      >
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2>Ready to DAO it?</h2>
          <a
            href="https://app.daohaus.club/explore"
            className="Button Big"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore DAOs
          </a>
        </div>
      </div>
      <div className="How Block">
        <div className="Block__Contents">
          <h3>How a DAO works</h3>
          <p>How communities use DAOhaus today</p>
          <div className="Row JustifyCenter">
            <div className="Column--50">
              <h5>Shared Treasury</h5>
              <p>Hold and distribute crypto.</p>
            </div>
            <div className="Column--50">
              <img src={HowTreasury} alt="app screenshot of treasury" />
            </div>
          </div>
          <div className="Row JustifyCenter">
            <div className="Column--50">
              <h5>Voting & Proposals</h5>
              <p>All decisions allow for members to vote.</p>
            </div>
            <div className="Column--50">
              <img src={HowProposals} alt="app screenshot of proposals" />
            </div>
          </div>
          <div className="Row JustifyCenter">
            <div className="Column--50">
              <h5>Dynamic Membership</h5>
              <p>Add/remove members together. Members can exit anytime.</p>
            </div>
            <div className="Column--50">
              <img src={HowMembers} alt="app screenshot of members" />
            </div>
          </div>
        </div>
      </div>
      <div className="Block Communities">
        <div className="Block__Contents">
          <h3>Interact with the entire Ethereum ecosystem of dApps.</h3>
          <p>
            Every community is unique, just like the people in it. DAOhaus can
            integrate with whatever tools your community needs to get things
            done. Join our discord and ask us anything. We love helping
            communities level up.
          </p>
          <img src={DaohausBauhaus} alt="ethereum ecosystem of dapps" />
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents">
          <h3>DAOhaus is community owned and operated.</h3>
          <p>
            Our mission is to foster an open economy of interconnected DAOs.
          </p>
        </div>
      </div>
      <div className="Block Footer">
        <div className="Block__Contents">
          <div className="Mark">
            <img src={DaohausLogo} alt="DaoHaus Logo" />
          </div>
          <div className="Social">
            <a
              href="https://twitter.com/nowdaoit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterCircleFilled />
            </a>
            <a
              href="https://discord.gg/NPEJysW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={DiscordSvg} />
            </a>
            <a
              href="https://github.com/odyssy-automaton/daohaus-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
