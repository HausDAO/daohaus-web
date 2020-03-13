import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-apollo';

import { MolochV2Context } from '../../contexts/ContractContexts';
import { GET_MOLOCHES, GET_MOLOCHES_V2 } from '../../util/queries';
import DaoFilter from '../daoFilter/DaoFilter';
import DaoList from '../daoList/DaoList';

const DaoListFetch = ({ version }) => {
  const [MolochV2] = useContext(MolochV2Context);
  const [filteredDaos, setFilteredDaos] = useState();
  const [mergedData, setMergedData] = useState();

  const query = version === '1' ? GET_MOLOCHES : GET_MOLOCHES_V2;
  const options =
    version === '1'
      ? { fetchPolicy: 'network-only' }
      : { client: MolochV2.client, fetchPolicy: 'network-only' };

  // const options = version === '1' ? {} : { client: MolochV2.client };

  const entityName = version === '1' ? 'factories' : 'daos';

  // console.log('query', query);
  // console.log('version', version);
  // console.log('options', options);

  // const { loading, error, data, fetchMore } = useQuery(query, options);
  const { loading, error, data } = useQuery(query, options);

  useEffect(() => {
    if (data) {
      setMergedData(
        version === '1'
          ? data[entityName]
          : data[entityName].map((dao, i) => {
              dao.metadata = data.moloches[i];
              return dao;
            }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  // fetchMore({
  //   variables: { skip: data[entityName].length },
  //   updateQuery: (prev, { fetchMoreResult }) => {
  //     if (!fetchMoreResult) return;

  //     return Object.assign({}, prev, {
  //       factories: [...prev[entityName], ...fetchMoreResult[entityName]],
  //       moloches:
  //         version === '2'
  //           ? [...prev.moloches, ...fetchMoreResult.moloches]
  //           : [],
  //     });
  //   },
  // });

  return (
    <>
      <div className="Search">
        {mergedData ? (
          <DaoFilter daos={mergedData} setFilteredDaos={setFilteredDaos} />
        ) : null}
      </div>
      <div className="Block Primary Home__Daolist">
        {filteredDaos ? <DaoList daos={filteredDaos} /> : null}
      </div>
    </>
  );
};

export default DaoListFetch;
