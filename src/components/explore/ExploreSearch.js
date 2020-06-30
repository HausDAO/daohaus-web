import React, { useContext } from 'react';

import './Explore.scss';
import { ExploreContext } from '../../contexts/ExploreContext';

const ExploreSearch = () => {
  const { dispatch } = useContext(ExploreContext);

  const handleChange = event => {
    if (event.target.value) {
      dispatch({
        type: 'setSearchTerm',
        payload: event.target.value.toLowerCase(),
      });

      // const filtered = _.sortBy(
      //   baseFilter(daos).filter(dao => {
      //     return (
      //       dao.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >
      //       -1
      //     );
      //   }),
      //   dao => {
      //     return sortAttribute(dao);
      //   },
      // ).reverse();

      // setMatchingDaos(filtered);
      // setFilteredDaos(filtered);
    } else {
      dispatch({ type: 'clearSearchTerm' });
      // resetDaos();
    }
  };

  return (
    <div className="ExploreSearch">
      <input
        type="search"
        className="input"
        placeholder="Search Daos"
        onChange={e => handleChange(e)}
      />
    </div>
  );
};

export default ExploreSearch;
