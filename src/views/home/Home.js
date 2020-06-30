import React, { useContext } from 'react';

import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';

import './Home.scss';
import { Web3Context } from '../../contexts/ContractContexts';

const Home = () => {
  const [web3context] = useContext(Web3Context);

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
        {web3context && web3context.account ? (
          <SummonButton />
        ) : (
          <ActivateButton msg={'Sign in'} />
        )}
      </div>
    </>
  );
};

export default Home;
