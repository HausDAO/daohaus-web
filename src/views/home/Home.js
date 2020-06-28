import React, { useState, useContext } from 'react';

import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';
import DaoFetcher from '../../components/daoFetch/DaoFetcher';

import './Home.scss';
import { Web3Context } from '../../contexts/ContractContexts';

const Home = () => {
  //const context = useWeb3Context();
  const [w3context] = useContext(Web3Context);

  const [molochVersion, setMolochVersion] = useState('all');

  const handleVersionChange = version => {
    setMolochVersion(version);
  };

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
        {w3context && w3context.user ? (
          <SummonButton />
        ) : (
          <ActivateButton msg={'Sign in'} />
        )}
      </div>

      <div className="VersionToggle">
        <div className="Contents Contain">
          <div
            className={molochVersion === 'all' ? 'active' : null}
            onClick={() => handleVersionChange('all')}
          >
            All Daos
          </div>
          <div
            className={molochVersion === '1' ? 'active' : null}
            onClick={() => handleVersionChange('1')}
          >
            Moloch V1 Daos
          </div>
          <div
            className={molochVersion === '2' ? 'active' : null}
            onClick={() => handleVersionChange('2')}
          >
            Moloch V2 Daos
          </div>
        </div>
      </div>

      <DaoFetcher version={molochVersion} />
    </>
  );
};

export default Home;
