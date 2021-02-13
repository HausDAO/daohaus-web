import React from 'react';
import { Carousel } from 'antd';

import HeroBackground from '../../assets/random-bg.png';

import './About.scss';

import { wtfSlides } from '../../content/home-content';

const About = () => {
  const renderSlides = () => {
    return (
      <Carousel
        autoplay={false}
        dots={true}
        dotsClass="Carousel__Dots"
        effect="fade"
      >
        {wtfSlides.map(slide => {
          return (
            <div key={slide.id} className="Carousel__Slide">
              <div
                className="Row"
                style={{ position: 'relative', width: '100%' }}
              >
                <div className="Column--50">
                  <h3>{slide.heading}</h3>
                  <h1>{slide.content}</h1>
                  <p>{slide.subcontent}</p>
                </div>
                <div className="Column--50">
                  <img src={slide.image} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    );
  };
  return (
    <div className="About">
      <div
        className="Hero"
        style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
      >
        <div className="Hero__Contents SmallContainer">
          <h3>Become one with the Haus of Daos.</h3>
          <h2>
            DAOs are eating trad orgs, and here’s why that’s a very very cool
            thing.
          </h2>
        </div>
      </div>
      <div className="Block PrimaryBg wtfSlides">
        <div className="Block__Contents">
          <div className="Carousel">{renderSlides()}</div>
        </div>
      </div>
      <div className="Block Tertiary">
        <div className="Block__Contents SmallContainer">
          <h1>
            The move to crypto and web3 enables humans to organize and
            collaborate like never before.
          </h1>
          <h3>Enter the DAO</h3>
          <p>
            For more info about daos, and Molochs specifically, read the{' '}
            <a
              href="https://medium.com/odyssy/moloch-primer-for-humans-9e6a4f258f78"
              rel="noopener noreferrer"
              target="_blank"
            >
              Moloch Primer for Humans
            </a>
            .
          </p>
        </div>
      </div>

      <div className="Block Tertiary">
        <div className="Block__Contents SmallContainer">
          <h2>History</h2>
          <p>
            The first Daohaus prototype was built at EthBerlin in about a day by{' '}
            <a
              href="https://odyssy.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              Odyssy
            </a>{' '}
            & Friends.
          </p>
          <p>
            You can read our introduction article on{' '}
            <a
              href="https://medium.com/odyssy/daohaus-bauhaus-b855cd9db19e"
              rel="noopener noreferrer"
              target="_blank"
            >
              Medium
            </a>
            .
          </p>
          <div className="Section History">
            <p className="Label">June 2019</p>
            <p className="Value">
              MetaCartel clones Moloch. Odyssy builds Pokemol v0.5.
            </p>
            <p className="Label">July 2019</p>
            <p className="Value">
              More Moloch clones start popping up like YangDAO and Orochi Dao
            </p>
            <p className="Label">August 2019</p>
            <p className="Value">
              Daohaus built and launched at EthBerlin Zwei in Berlin
            </p>
            <p className="Label">October 2019</p>
            <p className="Value">
              Pokemol v0.7 is released at DevCon V in Osaka
            </p>
            <p className="Label">December 2019</p>
            <p className="Value">
              All daos get a Pokemol automatically and Pokemol.com is born,
              uniting all Pokemols into one interface.
            </p>
            <p className="Label">Feb 2020</p>
            <p className="Value">Pokemol v1.0 launched</p>
            <p className="Label">July 2020</p>
            <p className="Value">
              Formed HausDAO to expand ownership and contributor base to
              DAOhaus. Raised 250k direct from the community to start work on
              DAOhaus V2
            </p>
            <p className="Label">December 2020</p>
            <p className="Value">
              DAOhaus team grows from 5 to 20 contributors. Finished first
              builds of DAOhaus V2 and started battle-testing with the
              community.
            </p>
            <p className="Label">Januaray 2021</p>
            <p className="Value">
              Refining the V2 with community feedback, and with a new foundation
              to integrate with DeFi and the rest of the Ethereum ecosystem.
            </p>
          </div>
          <div className="Section">
            <h3>Onward</h3>
            <p>
              Onward toward maximum composability and minimum coordination cost.
            </p>
            <p className="Label">February 2021</p>
            <p className="Value">
              Our next epic milestone is EthDenver 2021, and we'll have loads of
              updates along with a fresh launch of DAOhaus V2 out to all. Try{' '}
              <a
                href="https://app.daohaus.club"
                target="_blank"
                rel="noopener noreferrer"
              >
                DAOhaus V2
              </a>{' '}
              yourself!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
