import React from 'react';

import HeroBackground from '../../assets/random-bg.png';
import PokemolBrand from '../../assets/pokemol__brand--standard.png';
import DaohausBrand from '../../assets/logo.png';
import ThreeBoxBrand from '../../assets/3Box__logo.svg';
import MolochBrand from '../../assets/moloch__logo.svg';

import './About.scss';

const About = () => {
  return (
    <div className="About">
      <div
        className="Hero"
        style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
      >
        <div className="Hero__Contents SmallContainer">
          <h1>Become one with the Haus of Daos.</h1>
          <h2>Discover and pledge to join existing daos.</h2>
          <h2>Or summon your own.</h2>
        </div>
      </div>
      {/* Commented out until content is ready 
        <div className="Block Primary">
            <div className="Block__Contents SmallContainer">
                <h1>Examples of Daos</h1>
                <h3>Moloch DAO</h3>
                <p>Self-organize party</p>
            </div>
        </div>
        */}
      <div className="Block Tertiary">
        <div className="Block__Contents SmallContainer">
          <h1>Daohaus is on a mission to lower coordination cost to ZERO.</h1>
          <p>
            Daos are a powerful new type of organization, where no one person is
            in control. Instead, the power is distributed amongst all members of
            the dao. In Moloch daos, Members are granted Shares in exchange for
            Tribute, with which they vote on proposals. Once funds are in a dao,
            not a single penny can be distributed without a proposal.
          </p>
          <h3>Further Reading</h3>
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
      <div className="Block Primary">
        <div className="Block__Contents">
          <h2>Daohaus is a complete dao experience.</h2>
          <p className="Section">
            <img className="PokemolBrand" src={DaohausBrand} alt="daohaus" />
          </p>
          <p>
            <strong>Daohaus</strong> strives to be the most forward-thinking,
            user-friendly dao experience. In Daohaus, you can discover and join
            existing daos, as well as launch your own. Launching a dao on
            Daohaus provides a landing page where others can pledge to join.
            With our latest release, daos also get a Pokemol interface
            automatically.
          </p>
          <p className="Section">
            <img className="PokemolBrand" src={PokemolBrand} alt="pokemol" />
          </p>
          <p>
            <strong>Pokemol</strong> is a mobile-friendly app where you view,
            submit, and vote on dao proposals. It uses contract wallets via{' '}
            <a
              href="https://abridged.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              Abridged SDK
            </a>{' '}
            to greatly enhance dao participation and overall user experience
            such as:
          </p>
          <ul>
            <li>
              Can be used in any device/browser (no special Extensions or
              Browsers needed)
            </li>
            <li>
              One click interactions (no need for signing every transaction)
            </li>
            <li>Multiple transactions can be chained into one interaction</li>
          </ul>
          <p className="Section">
            <a
              href="https://github.com/MolochVentures/moloch"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className="PokemolBrand" src={MolochBrand} alt="3Box" />
            </a>
          </p>
          <p>
            <strong>Moloch</strong> dao contracts are used because they are
            simple, secure, and battle-tested in the real world. V2 is coming
            soon with some great updates, allowing for more use cases.
          </p>
          <p className="Section">
            <a href="https://3box.io" rel="noopener noreferrer" target="_blank">
              <img className="ThreeBoxBrand" src={ThreeBoxBrand} alt="3Box" />
            </a>
          </p>
          <p>
            <strong>3Box</strong> is used to show social-friendly user profiles.
            We'll be looking to integrate other social/coordination features
            over time.
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
          </div>
          <div className="Section">
            <h3>Onward</h3>
            <p>
              Onward toward maximum composability and minimum coordination cost.
            </p>
            <p className="Label">February 2020</p>
            <p className="Value">
              Our next epic milestone is EthDenver 2020, and we'll have loads of
              updates.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="Block">
        <div className="Block__Contents">
          <h2>Our Team is a dao</h2>
          <p>
            All grants received have gone into a dao called Raid Guild, itself
            launched on Daohaus, where the funds are distributed to those
            contributing to the project.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default About;
