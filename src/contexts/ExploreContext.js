import React from 'react';

import { sortOptions } from '../util/helpers';

const ExploreContext = React.createContext();

const initialState = {
  allDaos: [],
  sort: sortOptions[0],
  filters: {
    memberCount: 1,
    versions: ['1', '2'],
  },
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
    case 'updateSort': {
      return { ...state, sort: action.payload };
    }
    case 'resetSort': {
      return { ...state, sort: initialState.sort };
    }
    case 'addFilter': {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    }
    case 'removeFilter': {
      const updatedFilters = { ...state.filters };
      delete updatedFilters[action.payload.field];

      return { ...state, filters: updatedFilters };
    }
    default: {
      return initialState;
    }
  }
};

function ExploreContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ExploreContext.Provider value={value}>
      {props.children}
    </ExploreContext.Provider>
  );
}

const ExploreContextConsumer = ExploreContext.Consumer;

export { ExploreContext, ExploreContextProvider, ExploreContextConsumer };
