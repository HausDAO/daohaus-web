import React from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';

import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import { GET_MOLOCHES } from '../../util/queries';
import HeroBackground from '../../assets/daohaus__hero--falling.png';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const { loading, error, data } = useQuery(GET_MOLOCHES);
  const filterDaos = daos => {
    console.log('daos', daos);
    // return daos.filter(dao => !dao.apiData.hide);
    return daos
      .filter(dao => !dao.apiData.hide)
      .sort((a, b) => {
        ///TODO: sort by member - check against legacy
      });
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
          Haus of Moloch
        </h1>
        <h2>
          Discover and Pledge to existing Moloch DAOs, or summon your own.
        </h2>
        {context.active && !context.error && <SummonButton />}
      </div>
      <div className="View">
        {loading ? <p>THE HAUS IS LOADING THE DAOS</p> : null}
        {error ? <p>Error - are you on mainnet?</p> : null}
        {data ? <DaoList daos={filterDaos(data.factories)} /> : null}
      </div>
    </>
  );
};

export default Home;
