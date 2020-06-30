import React from 'react';

import ExploreSort from './ExploreSort';
import FilterList from './FilterList';
import {
  MEMBER_FILTER_OPTIONS,
  VERSION_FILTER_OPTIONS,
} from '../../util/constants';

import './Explore.scss';

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
      <div className="ExploreFilters__filters">
        <p>Filters</p>
        <FilterList
          filterKey="members"
          name="Members"
          options={MEMBER_FILTER_OPTIONS}
        />

        <FilterList
          filterKey="versions"
          name="Version"
          options={VERSION_FILTER_OPTIONS}
        />
      </div>
    </div>
  );
};

export default ExploreFilters;
