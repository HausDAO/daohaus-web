import React from 'react';
import { useWeb3Context } from 'web3-react';

import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';
import DaoFetcher from '../../components/daoFetch/DaoFetcher';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();

  return (
    <>
      <div
        className="Hero"
        style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
      >
        <h1>
          Explore the
          <br />
          Haus of Daos
        </h1>
        <h2>Discover and pledge to join existing daos.</h2>
        <h2>Or summon your own.</h2>
        {context.active && !context.error ? (
          <SummonButton />
        ) : (
          <ActivateButton msg={'Sign in'} />
        )}
      </div>

      <DaoFetcher />
    </>
  );
};

export default Home;
