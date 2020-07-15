import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { GET_TOKENS } from '../util/queries';
import {
  SORT_OPTIONS,
  PURPOSE_FILTER_OPTIONS,
  VERSION_FILTER_OPTIONS,
} from '../util/constants';
import { useQuery } from 'react-apollo';
import { getUsd } from '../util/prices';

const ExploreContext = React.createContext();

const initialState = {
  allDaos: [],
  prices: null,
  sort: SORT_OPTIONS[0],
  filters: {
    members: ['1'],
    versions: VERSION_FILTER_OPTIONS.map(o => o.value),
    purpose: PURPOSE_FILTER_OPTIONS.map(o => o.value),
  },
  searchTerm: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'resetAll': {
      return initialState;
    }
    case 'setAllDaos': {
      return { ...state, allDaos: action.payload };
    }
    case 'clearAllDaos': {
      return { ...state, allDaos: [] };
    }
    case 'setPrices': {
      return { ...state, prices: action.payload };
    }
    case 'clearPrices': {
      return { ...state, searchTerm: initialState.prices };
    }
    case 'updateSort': {
      return { ...state, sort: action.payload };
    }
    case 'resetSort': {
      return { ...state, sort: initialState.sort };
    }
    case 'addFilter': {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    }
    case 'updateFilter': {
      const updatedFilters = { ...state.filters, ...action.payload };

      return { ...state, filters: updatedFilters };
    }
    case 'setSearchTerm': {
      return { ...state, searchTerm: action.payload };
    }
    case 'clearSearchTerm': {
      return { ...state, searchTerm: initialState.searchTerm };
    }

    default: {
      return initialState;
    }
  }
};

function ExploreContextProvider(props) {
  const [fetchComplete, setFetchComplete] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  const { loading, error, data, fetchMore } = useQuery(GET_TOKENS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const getAllPrices = async () => {
      const uniqueTokens = _.uniq(data.tokens.map(token => token.tokenAddress));

      const res = await getUsd(uniqueTokens.join(','));

      dispatch({ type: 'setPrices', payload: res.data });
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
    <ExploreContext.Provider value={value}>
      {props.children}
    </ExploreContext.Provider>
  );
}

const ExploreContextConsumer = ExploreContext.Consumer;

export { ExploreContext, ExploreContextProvider, ExploreContextConsumer };
