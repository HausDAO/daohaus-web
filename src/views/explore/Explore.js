import React, { useContext, useEffect } from 'react';

import { ExploreContext } from '../../contexts/ExploreContext';
import { PriceContext } from '../../contexts/PricesContext';
import FilterBar from '../../components/explore/ExploreFilters';
import ExploreFetch from '../../components/explore/ExploreFetch';
import DaoList from '../../components/daoList/DaoList';

import './Explore.scss';
import Loading from '../../components/loading/Loading';

const Explore = () => {
  const { state, dispatch } = useContext(ExploreContext);
  //TODO: Move this to the explore state and lose the PriceContext
  //TODO: need better guildbankvalue handling in resolver in general,
  // 1)v1 value to graph?
  // 2) missing context errors
  // 3) maybe it's own field only for explore so as not to fuck with other places using it and prices aren't around
  //TODO: smoother loading transitions
  const [prices] = useContext(PriceContext);

  console.log('prices', prices);

  useEffect(() => {
    dispatch({ type: 'clearAllDaos' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Explore__hero">
        <h1>EXPLORE</h1>
      </div>

      {prices ? <ExploreFetch /> : <Loading msg={'getting things'} />}

      {state.allDaos.length ? (
        <>
          <div className="FilterBar">
            <FilterBar />
          </div>
          <div className="View">
            <DaoList />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Explore;
