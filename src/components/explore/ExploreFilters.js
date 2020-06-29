import React from 'react';

import './Explore.scss';
import ExploreSort from './ExploreSort';

const ExploreFilters = () => {
  return (
    <div className="ExploreFilters">
      <div>
        <input
          type="search"
          className="input"
          placeholder="Search Daos"
          // onChange={e => handleChange(e)}
        />
      </div>
      <div className="ExploreFilters__sort">
        <p>Sort by</p>
        <ExploreSort />
      </div>
      <div>
        <p>Filters</p>
      </div>
    </div>
  );
};

export default ExploreFilters;
