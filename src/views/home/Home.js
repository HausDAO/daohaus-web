import React, { useContext } from 'react';
import { Carousel } from 'antd';
import Icon, { TwitterCircleFilled, GithubOutlined } from '@ant-design/icons';

import { ReactComponent as DiscordSvg } from '../../assets/branding/Discord.svg';
import { ReactComponent as TelegramSvg } from '../../assets/branding/Telegram.svg';

import { Web3Context } from '../../contexts/ContractContexts';
import { ExploreContext } from '../../contexts/ExploreContext';
import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import FeaturedDaos from '../../components/featuredDaos/FeaturedDaos';
import DaohausCastle from '../../assets/daohaus__brand--castle.svg';
import GetStartedBackground from '../../assets/daohaus__seciton5-bg-shapes.png';
import FallingBackground from '../../assets/daohaus__hero--falling.png';
import DaohausLogo from '../../assets/logo.png';
import RandomBackground from '../../assets/random-bg.png';

import {
  heroSlides,
  daohausFeatures,
  pricingPacks,
  integrationLogos,
} from '../../content/home-content';

import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const [web3context] = useContext(Web3Context);
  const { state } = useContext(ExploreContext);

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
              <div className="Overlay" />
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
          <img src={DaohausCastle} alt="DAOHAUS" />
          <h1>
            Magic internet
            <br />
            communities* for all.
            <span>* DAOs ;)</span>
          </h1>
          {web3context && web3context.account ? (
            <SummonButton />
          ) : (
            <ActivateButton msg={'Sign in'} />
          )}
        </div>
        <div className="Carousel">{renderSlides()}</div>
      </div>

      <div className="Features Block">
        <div className="Block__Contents">
          <div className="Row">
            <div
              className="FeaturesHeading"
              style={{ flexDirection: 'column' }}
            >
              <h5>Ya’ll just chattin smh</h5>
              <h2>Share resources and get stuff done. Together.</h2>
            </div>
            <div className="AmountRaised">
              <p>
                <span>$5,420,609 raised</span>
                <br />
                $3,128,476 spent
              </p>
            </div>
          </div>
          <div className="FeaturesList">
            {daohausFeatures.map(feature => {
              return (
                <div key={feature.sub}>
                  <img src={feature.icon} alt={feature.sub} />
                  <h4>{feature.sub}</h4>
                  <p>{feature.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="Block Communities"
        style={{ backgroundImage: 'url(' + RandomBackground + ')' }}
      >
        <div className="Block__Contents">
          <div className="CommunitiesHeading">
            <h3>
              We{' '}
              <span role="img" aria-label="Love">
                ❤️
              </span>{' '}
              Communities
            </h3>
          </div>
          {state.prices ? <FeaturedDaos /> : null}
        </div>
      </div>
      <div
        className="Row GetStarted"
        style={{ backgroundImage: 'url(' + GetStartedBackground + ')' }}
      >
        <div>
          <h2>
            Don’t be shy. Discover and join a decentralized community today.
          </h2>
          <Link to="/explore" className="Button Big">
            Explore
          </Link>
        </div>
      </div>
      <div className="Boosts Block">
        <div className="Block__Contents">
          <div className="BoostsHeading">
            <h2>Boost Packs</h2>
            <h4>Level up your community, or gift to another.</h4>
          </div>
          <div className="BoostsPricing GridList">
            {pricingPacks.map(pack => {
              return (
                <div key={pack.name} className="Boost GridList__Item">
                  <h2>{pack.name}</h2>
                  <ul>
                    {pack.features.map(feature => {
                      return <li key={feature}>{feature}</li>;
                    })}
                  </ul>
                  <h3 className="Price">{pack.price}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="Block DaoConsultation"
        style={{ backgroundImage: 'url(' + FallingBackground + ')' }}
      >
        <div className="Block__Contents">
          <div className="Column">
            <h2>Every community is unique, just like the people in it.</h2>
            <h4>
              DAOhaus can integrate with whatever tools your community needs to
              get things done.
            </h4>
            <h4>
              Join our discord and ask us anything. We love helping communities
              level up.
            </h4>
            <a
              className="Button"
              href="https://discord.gg/NPEJysW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={DiscordSvg} /> Join us in Discord
            </a>
          </div>
          <div className="Icons">
            {integrationLogos.map(logo => {
              return (
                <img
                  src={require('../../assets/' + logo.img)}
                  alt={logo.alt}
                  key={logo.alt}
                  style={{ top: logo.top, left: logo.left }}
                  className="Icon"
                />
              );
            })}
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
              href="https://t.me/joinchat/IJqu9xPa0xzYLN1mmFKo8g"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={TelegramSvg} />
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
