import React, { useContext } from 'react';
import { useQuery } from 'react-apollo';

import { MolochV2Context } from '../../contexts/ContractContexts';
import { GET_MOLOCHES, GET_MOLOCHES_V2 } from '../../util/queries';
import DaoFilter from '../daoFilter/DaoFilter';

const DaoListFetch = ({ version }) => {
  const [MolochV2] = useContext(MolochV2Context);

  const query = version === '1' ? GET_MOLOCHES : GET_MOLOCHES_V2;
  const options =
    version === '1'
      ? { fetchPolicy: 'network-only' }
      : { client: MolochV2.client, fetchPolicy: 'network-only' };
  const entityName = version === '1' ? 'factories' : 'daos';
  const { loading, error, data, fetchMore } = useQuery(query, options);

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data[entityName].length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult[entityName].length === 0) {
        return prev;
      }

      return Object.assign({}, prev, {
        [entityName]: [...prev[entityName], ...fetchMoreResult[entityName]],
        moloches:
          version === '2'
            ? [...prev.moloches, ...fetchMoreResult.moloches]
            : [],
      });
    },
  });

  return (
    <>
      <div className="Search">
        {data ? (
          <DaoFilter
            daos={data[entityName]}
            v2Moloches={data.moloches}
            version={version}
          />
        ) : null}
      </div>
    </>
  );
};

export default DaoListFetch;
