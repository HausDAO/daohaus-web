import React, { useContext } from 'react';
import Select from 'react-select';

import { ExploreContext } from '../../contexts/ExploreContext';
import { sortOptions } from '../../util/helpers';

import './Explore.scss';

const ExploreSort = () => {
  const { state, dispatch } = useContext(ExploreContext);

  const handleChange = option => {
    dispatch({ type: 'updateSort', payload: option });
  };

  return (
    <div className="ExploreSort">
      <Select
        value={state.sort}
        onChange={option => handleChange(option)}
        options={sortOptions}
      />
    </div>
  );
};

export default ExploreSort;
