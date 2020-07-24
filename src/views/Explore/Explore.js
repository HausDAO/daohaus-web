import React, { useContext, useEffect } from 'react';

import { ExploreContext } from '../../contexts/ExploreContext';
import ExploreFilters from '../../components/Explore/ExploreFilters';
import ExploreFetch from '../../components/Explore/ExploreFetch';
import DaoList from '../../components/DaoList/DaoList';

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
            <ExploreFilters />
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
