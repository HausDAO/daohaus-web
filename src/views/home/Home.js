import React, { useState } from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOLOCHES } from '../../util/queries';
import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';
import DaoFilter from '../../components/daoFilter/DaoFilter';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const [filteredDaos, setFilteredDaos] = useState();
  const { loading, error, data, fetchMore } = useQuery(GET_MOLOCHES);

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data.factories.length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return;
      return Object.assign({}, prev, {
        factories: [...prev.factories, ...fetchMoreResult.factories],
      });
    },
  });

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
      <div className="Search">
        {data ? (
          <DaoFilter daos={data.factories} setFilteredDaos={setFilteredDaos} />
        ) : null}
      </div>
      <div className="Block Primary Home__Daolist">
        {filteredDaos ? <DaoList daos={filteredDaos} /> : null}
      </div>
    </>
  );
};

export default Home;
