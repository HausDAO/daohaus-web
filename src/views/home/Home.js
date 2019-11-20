import React from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import { GET_MOLOCHES } from '../../util/queries';
import HeroBackground from '../../assets/daohaus__hero--falling.png';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const { loading, error, data } = useQuery(GET_MOLOCHES);
  const filterDaos = daos => {
    return _.sortBy(daos.filter(dao => !dao.apiData.hide), dao => {
      return +dao.tokenInfo.guildBankValue;
    }).reverse();
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
