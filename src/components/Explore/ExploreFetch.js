import React, { useContext } from 'react';
import { useQuery } from 'react-apollo';

import { GET_MOLOCHES_EXPLORER } from '../../util/queries';
import { ExploreContext } from '../../contexts/ExploreContext';

const ExploreFetch = () => {
  const { state, dispatch } = useContext(ExploreContext);

  const { loading, error, data, fetchMore } = useQuery(GET_MOLOCHES_EXPLORER, {
    fetchPolicy: 'network-only',
    context: { prices: state.prices },
  });

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  console.log('data.moloches', data.moloches);

  fetchMore({
    variables: { skip: data.moloches.length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.moloches.length === 0) {
        dispatch({ type: 'setAllDaos', payload: data.moloches });
        return prev;
      }

      return Object.assign({}, prev, {
        moloches: [...prev.moloches, ...fetchMoreResult.moloches],
      });
    },
  });

  return <></>;
};

export default ExploreFetch;
