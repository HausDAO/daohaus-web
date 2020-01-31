import React, { useState, useContext } from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOLOCHES, GET_V2_MOLOCHES } from '../../util/queries';
import { MolochV2Context } from '../../contexts/ContractContexts';
import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeroBackground from '../../assets/daohaus__hero--falling.png';
import DaoFilter from '../../components/daoFilter/DaoFilter';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const [molochV2] = useContext(MolochV2Context);

  console.log('molochV2', molochV2);
  const [molochVersion, setMolochVersion] = useState('1');
  const [graphQuery, setGraphQuery] = useState({
    query: GET_MOLOCHES,
    options: {},
  });

  console.log('graphQuery.query', graphQuery.query);

  const [filteredDaos, setFilteredDaos] = useState();
  const { loading, error, data, fetchMore, refetch } = useQuery(
    graphQuery.query,
    graphQuery.options,
  );

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

  const handleVersionChange = version => {
    const query = version === '1' ? GET_MOLOCHES : GET_V2_MOLOCHES;
    const options = version === '1' ? {} : { client: molochV2.client };

    console.log('query', query);
    console.log('options', options);
    setMolochVersion(version);
    setGraphQuery({ query, options });
    refetch();
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
        <div className="radio">
          <label>
            <input
              type="radio"
              value="1"
              checked={molochVersion === '1'}
              onChange={() => handleVersionChange('1')}
            />
            Moloch V1
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="2"
              checked={molochVersion === '2'}
              onChange={() => handleVersionChange('2')}
            />
            Moloch V2
          </label>
        </div>
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

  // return (
  //   <>
  //     <div
  //       className="Hero"
  //       style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
  //     >
  //       <h1>
  //         Explore the
  //         <br />
  //         Haus of Daos
  //       </h1>
  //       <h2>Discover and pledge to join existing daos.</h2>
  //       <h2>Or summon your own.</h2>
  //       {context.active && !context.error ? (
  //         <SummonButton />
  //       ) : (
  //         <ActivateButton msg={'Sign in'} />
  //       )}
  //     </div>

  //     <div className="Block Primary">
  //       {loading ? <p className="View">Loading DAOs</p> : null}
  //       {error ? <p className="View">Sorry there's been an error</p> : null}
  //       {data ? <DaoList daos={filterDaos(data.factories)} /> : null}
  //       <div className="VersionToggle">
  //         <div className="radio">
  //           <label>
  //             <input
  //               type="radio"
  //               value="1"
  //               checked={molochVersion === '1'}
  //               onChange={() => setMolochVersion('1')}
  //             />
  //             Moloch V1
  //           </label>
  //         </div>
  //         <div className="radio">
  //           <label>
  //             <input
  //               type="radio"
  //               value="2"
  //               checked={molochVersion === '2'}
  //               onChange={() => setMolochVersion('2')}
  //             />
  //             Moloch V2
  //           </label>
  //         </div>
  //       </div>
  //       <div className="Search">
  //         {data ? (
  //           <DaoFilter
  //             daos={data.factories}
  //             setFilteredDaos={setFilteredDaos}
  //           />
  //         ) : null}
  //       </div>
  //       <div className="Block Primary Home__Daolist">
  //         {filteredDaos ? <DaoList daos={filteredDaos} /> : null}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Home;
