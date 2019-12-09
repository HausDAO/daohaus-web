import React from 'react';
import { useQuery } from 'react-apollo';

import { GET_MEMBERDATA } from '../../util/queries';
import HeroBackground from '../../assets/random-bg.png';
import PokemolBrand from '../../assets/pokemol__brand--standard.png';

import './About.scss';
import MemberItem from '../../components/memberItem/MemberItem';

const About = () => {
  const { data } = useQuery(GET_MEMBERDATA, {
    variables: { contractAddr: process.env.REACT_APP_RAIDGUILD_ADDRESS },
  });

  const renderMembers = () => {
    return data.members.map((member, i) => {
      return (
        <div key={i} className="ApplicationList__Item">
          <MemberItem
            applicant={member}
            applicantAddress={member.memberId}
            daoData={{ summoner: '0x' }}
          />
        </div>
      );
    });
  };

  return (
    <div className="FullView">
      <div
        className="Hero"
        style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
      >
        <div className="Hero__Contents SmallContainer">
          <h1>Become one with the Haus of Moloch.</h1>
          <p className="Large">
            Discover and pledge to join daos. Or summon your own.
          </p>
        </div>
      </div>
      <div className="Block Primary">
        <div className="Block__Contents SmallContainer">
          <h1>Daohaus is on a mission to lower coordination cost to ZERO.</h1>
          <p>
            Daos are a powerful new type of organization, where no one person is
            in control. Instead, the power is distributed amongst all members of
            the dao. Members are granted Shares in exchange for Tribute, with
            which they vote on proposals. Once funds are in a dao, not a single
            penny can be distributed without a proposal.
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
        <div className="Block__Contents">
          <h2>How it Works</h2>
          <p>
            Daohaus and Pokemol work in tandem to deliver the most
            forward-thinking dao experience.
          </p>
          <p>
            <strong>Daohaus</strong> is where you can discover and join daos, as
            well as summon your own. You can Update Delegate to use contract
            wallets, and Ragequit Shares
          </p>
          <p>
            <img className="PokemolBrand" src={PokemolBrand} alt="pokemol" />
          </p>
          <p>
            <strong>Pokemol</strong> is a mobile-friendly app where you view,
            submit, and vote on dao proposals.
          </p>
          <p>
            <a href="/help#Pokemol-Intro">More info</a>
          </p>
        </div>
      </div>
      <div className="Block">
        <div className="Block__Contents SmallContainer">
          <h2>History</h2>
          <p>Daohaus was built at EthBerlin in about a day.</p>
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
          <p className="Value">Pokemol v0.7 is released at DevCon V in Osaka</p>
          <p className="Label">December 2019</p>
          <p className="Value">
            All daos get a Pokemol automatically and Pokemol.com is born,
            uniting all Pokemols into one interface.
          </p>
          <h3>Roadmap</h3>
          <p className="Label">February 2020</p>
          <p className="Value">
            Our next epic milestone is EthDenver 2020, and we'll have loads of
            updates.
          </p>
        </div>
      </div>
      <div className="Block Tertiary">
        <div className="Block__Contents">
          <h2>Our Team is a dao</h2>
          <p>
            All grants received have gone into a dao called Raid Guild, itself
            launched on Daohaus, where the funds are distributed to those
            contributing to the project.
          </p>
          <h3>Members of Raid Guild</h3>
          {data ? <>{renderMembers()}</> : null}
        </div>
      </div>
    </div>
  );
};

export default About;
