import React, { useEffect } from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';
// import { InMemoryCache } from 'apollo-boost';

import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import { GET_MOLOCHES, GET_API_MOLOCHES } from '../../util/queries';
// import { get } from '../../util/requests';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const { loading, error, data } = useQuery(GET_MOLOCHES);

  console.log('data', data);
  const { loadingApi, errorApi, dataApi } = useQuery(GET_API_MOLOCHES);

  console.log('loadingApi', loadingApi);
  console.log('errorApi', errorApi);
  console.log('dataApi', dataApi);

  useEffect(() => {
    // const fetchData = async () => {
    //   const daoRes = await get(`moloch/`);
    //   const cache = new InMemoryCache();
    //   cache.writeData({
    //     data: {
    //       apiDaos: daoRes.data,
    //     },
    //   });
    // };
    // fetchData();
  }, []);

  return (
    <>
      <div className="Hero">
        <h1>Explore the Haus of Moloch</h1>
        <h2>
          Discover and Pledge to existing Moloch DAOs, or summon your own.
        </h2>
        {context.active && !context.error && <SummonButton />}
      </div>
      <div className="View">
        {loading ? <p>THE HAUS IS LOADING THE DAOS</p> : null}
        {error ? <p>Error</p> : null}
        {data ? <DaoList daos={data.factories} /> : null}
      </div>
    </>
  );
};

export default Home;
