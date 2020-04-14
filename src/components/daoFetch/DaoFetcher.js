import React from 'react';
import { useQuery } from 'react-apollo';

import { GET_MOLOCHES } from '../../util/queries';
import DaoFilter from '../daoFilter/DaoFilter';

const DaoFetcher = ({ version }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_MOLOCHES, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data.moloches.length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.moloches.length === 0) {
        return prev;
      }

      return Object.assign({}, prev, {
        moloches: [...prev.moloches, ...fetchMoreResult.moloches],
      });
    },
  });

  return (
    <>
      <div className="Search">
        {data ? <DaoFilter daos={data.moloches} version={version} /> : null}
      </div>
    </>
  );
};

export default DaoFetcher;
