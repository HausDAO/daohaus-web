import React, { useContext, useEffect } from 'react';

import { ExploreContext } from '../../contexts/ExploreContext';
import FilterBar from '../../components/explore/ExploreFilters';
import ExploreFetch from '../../components/explore/ExploreFetch';
import DaoList from '../../components/daoList/DaoList';

import './Explore.scss';

const Explore = () => {
  const { state, dispatch } = useContext(ExploreContext);

  useEffect(() => {
    dispatch({ type: 'resetExplore' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Explore__hero">
        <h1>EXPLORE</h1>
      </div>

      {state.allDaos.length ? (
        <>
          <div className="FilterBar">
            <FilterBar />
          </div>
          <div className="View">
            <DaoList />
          </div>
        </>
      ) : (
        <>{state.prices ? <ExploreFetch /> : null}</>
      )}
    </>
  );
};

export default Explore;
