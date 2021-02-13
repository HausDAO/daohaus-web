import React from 'react';
import { Carousel } from 'antd';
import Icon, { TwitterCircleFilled, GithubOutlined } from '@ant-design/icons';
import { ImTwitter } from 'react-icons/im';
import { DiGithubAlt } from 'react-icons/di';

import InfographicTrad from '../../assets/infographic__trad.png';
import InfographicDAO from '../../assets/infographic__dao.png';
import GraphicCommunities from '../../assets/graphic__communities.png';
import DaohausBauhaus from '../../assets/bauhaus__composable.png';
import DaohausHugeType from '../../assets/daohaus__hugeType.png';
import HausHugeType from '../../assets/haus__hugeType.png';

import HowTreasury from '../../assets/how__treasury.png';
import HowProposals from '../../assets/how__proposals.png';
import HowMembers from '../../assets/how__members.png';

import IconA from '../../assets/ico-grants.png';
import IconB from '../../assets/ico-protocols.png';
import IconC from '../../assets/ico-guilds.png';
import IconD from '../../assets/ico-clubs.png';

import { ReactComponent as DiscordSvg } from '../../assets/branding/Discord.svg';
import { ReactComponent as SubstackSvg } from '../../assets/Substack.svg';

import DaohausCastleLight from '../../assets/daohaus__brand--castle--light.png';
import GetStartedBackground from '../../assets/daohaus__seciton5-bg-shapes.png';
import DaohausLogo from '../../assets/logo.png';

import { heroSlides } from '../../content/home-content';

import './Home.scss';
import { introspectionFromSchema } from 'graphql';

const Home = () => {
  const renderSlides = () => {
    return (
      <Carousel autoplay={true} dots={false} effect="fade" autoplaySpeed={5000}>
        {heroSlides.map(slide => {
          return (
            <div key={slide.id} className="Carousel__Slide">
              {/* <div className="Content">
                <p>{slide.content}</p>
                <h4>{slide.heading}</h4>
              </div> */}
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
    <div className="Home">
      <div className="HomeHero">
        <div className="SummonHero">
          <h1>
            Unlock the next tier <br />
            in community coordination
          </h1>
          <p className="BigP daoColor" style={{ maxWidth: '500px' }}>
            We believe in power to the people. Join us in pioneering a future
            where communities replace corporations and humans own the web.
          </p>
          <p>
            Secured by the{' '}
            <a
              href="https://ethereum.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ethereum
            </a>{' '}
            blockchain ❤️
          </p>
          <div className="Social">
            <a
              href="https://discord.gg/NPEJysW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={DiscordSvg} />
            </a>
            <a
              href="https://daohaus.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={SubstackSvg} style={{ fill: '#513e97' }} />
            </a>
            <a
              href="https://github.com/odyssy-automaton/daohaus-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiGithubAlt />
            </a>
            <a
              href="https://twitter.com/nowdaoit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImTwitter />
            </a>
          </div>
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
              <img src={InfographicTrad} alt="infographic trad" width="240px" />
              <h5 className="tradColor">Traditional Organization</h5>
              <h2>Power held by few at the top</h2>
              <p className="tradColor">
                Rigid, Competition, Inequality, Opaque{' '}
              </p>
            </div>
            <div className="Column--50">
              <img src={InfographicDAO} alt="infographic dao" width="240px" />
              <h5 className="daoColor">DAO</h5>
              <h2>Power shared by all</h2>
              <p className="daoColor">
                Agile, Collaboration, Diversity, Transparent
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Usecases Block">
        <div className="Block__Contents">
          <h3>How is it Used?</h3>
          <p>
            How communities use DAOhaus <span className="daoColor">TODAY</span>
          </p>
          <div className="Row">
            <div className="Column--50">
              <img src={IconA} alt="" width="80px" />
              <h5>Grants & Investments</h5>
              <p>
                The first major use of DAOs has been through community grants!
                Millions have been raised and distributed to early developers of
                this technology.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconB} alt="" width="80px" />
              <h5>Ventures</h5>
              <p>
                The DAOhaus project is a prime example of a project based DAO.
                Every community initiative can now become a funded reality.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconC} alt="" width="80px" />
              <h5>Guilds & Services</h5>
              <p>
                Freelancers rejoice! Guilds have re-emerged as a powerful
                collective force. Some even have members who quit their day jobs
                to work for a DAO.
              </p>
            </div>
            <div className="Column--50">
              <img src={IconD} alt="" width="80px" />
              <h5>Social</h5>
              <p>
                Get your friends together and put your money where your mouth
                is! Clubs are culture machines, and DAOhaus is flexible enough
                to keep the party going.
              </p>
            </div>
          </div>
          <p style={{ marginTop: 75 }}>
            How communities will use DAOs{' '}
            <span className="yellowColor">TOMORROW</span>
          </p>
          <div className="Row">
            <div className="Column--33">
              <img src={IconA} alt="" width="80px" />
              <p>
                Player-owned
                <br />
                <strong>Games</strong>
              </p>
            </div>
            <div className="Column--33">
              <img src={IconA} alt="" width="80px" />
              <p>
                Brewer-owned
                <br />
                <strong>Breweries</strong>
              </p>
            </div>
            <div className="Column--33">
              <img src={IconC} alt="" width="80px" />
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
              <p className="BigP">
                DAOhaus communities have raised over $21m to build, hire and
                invest as one unified voice.{' '}
              </p>
              <a
                href="https://app.daohaus.club/explore"
                className="Button Outlined"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore DAOs
              </a>
            </div>
            <div className="Column--50">
              <img src={GraphicCommunities} alt="dao communities" />
            </div>
          </div>
        </div>
      </div>
      {/* <div
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
      </div> */}
      <div className="How Block">
        <div className="Block__Contents">
          <h3>How a DAO works</h3>
          <p>Just the basics.</p>
          <div className="Row AlignCenter">
            <div className="Column--50">
              <h5>Shared Treasury</h5>
              <p>Community funds are held by the DAO itself.</p>
            </div>
            <div className="Column--50">
              <img src={HowTreasury} alt="app screenshot of treasury" />
            </div>
          </div>
          <div className="Row AlignCenter">
            <div className="Column--50">
              <h5>Voting & Proposals</h5>
              <p>Decisions are made by voting on community proposals.</p>
            </div>
            <div className="Column--50">
              <img src={HowProposals} alt="app screenshot of proposals" />
            </div>
          </div>
          <div className="Row AlignCenter">
            <div className="Column--50">
              <h5>Dynamic Membership</h5>
              <p>
                Members are added by community vote and may leave at any time.
              </p>
            </div>
            <div className="Column--50">
              <img src={HowMembers} alt="app screenshot of members" />
            </div>
          </div>
        </div>
      </div>
      <div className="Block Communities">
        <div className="Block__Contents">
          <div className="Row">
            <div className="Column--50">
              <h3>Interact with the entire Ethereum ecosystem of dApps.</h3>
              <p>
                Make trades on Uniswap, use a Gnosis safe, update a 3Box
                profile- all as a community.
              </p>
              <p>
                If you’re building something that could be useful for DAOs, hit
                us up in our Discord ->
              </p>
            </div>
            <div className="Column--50">
              <img src={DaohausBauhaus} alt="ethereum ecosystem of dapps" />
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
              <p>
                DAOhaus is owned and built by the community using DAOs to
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
              <h4 className="daoColor">Discord</h4>
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
                Stalk that alpha. Stay up to date and learn what’s on the
                horizon from top web3 builders.
              </p>
            </div>
            <div className="Column--33 SocialItem">
              <a
                href="https://github.com/odyssy-automaton/daohaus-web"
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
    </div>
  );
};

export default Home;
