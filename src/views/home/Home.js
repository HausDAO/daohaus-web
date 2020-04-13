import React, { useState } from 'react';
import { useWeb3Context } from 'web3-react';

import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';
import DaoListFetch from '../../components/daoFetch/DaoListFetch';

import './Home.scss';
import DaoFetcher from '../../components/daoFetch/DaoFetcher';

const Home = () => {
  const context = useWeb3Context();
  const [molochVersion, setMolochVersion] = useState('1');

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
        {context.active && !context.error ? (
          <SummonButton />
        ) : (
          <ActivateButton msg={'Sign in'} />
        )}
      </div>
      <div className="VersionToggle">
        <div className="Contents Contain">
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

      {/* <DaoListFetch version={molochVersion} /> */}

      <DaoFetcher />
    </>
  );
};

export default Home;
