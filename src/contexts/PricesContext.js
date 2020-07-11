import React, { useState, useEffect, createContext } from 'react';
import { useQuery } from 'react-apollo';
import _ from 'lodash';

import { GET_TOKENS } from '../util/queries';
import { getUsd } from '../util/prices';
import Loading from '../components/loading/Loading';

export const PriceContext = createContext();

const PricesContext = ({ children }) => {
  const [prices, setPrices] = useState();
  const [fetchComplete, setFetchComplete] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_TOKENS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const getAllPrices = async () => {
      const uniqueTokens = _.uniq(data.tokens.map(token => token.tokenAddress));

      const res = await getUsd(uniqueTokens.join(','));

      console.log('res', res);

      setPrices(res.data);
    };

    if (fetchComplete) {
      getAllPrices();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchComplete]);

  if (loading) return <></>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data.tokens.length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.tokens.length === 0) {
        setFetchComplete(true);
        return prev;
      }

      return Object.assign({}, prev, {
        tokens: [...prev.tokens, ...fetchMoreResult.tokens],
      });
    },
  });

  return (
    <PriceContext.Provider value={[prices, setPrices]}>
      {prices ? children : <Loading />}
    </PriceContext.Provider>
  );
};

export default PricesContext;
