import React, { useContext, useEffect } from 'react';

import { ExploreContext } from '../../contexts/ExploreContext';
import { PriceContext } from '../../contexts/PricesContext';
import FilterBar from '../../components/explore/ExploreFilters';
import ExploreFetch from '../../components/explore/ExploreFetch';
import DaoList from '../../components/daoList/DaoList';

import './Explore.scss';

const Explore = () => {
  const { state, dispatch } = useContext(ExploreContext);
  //TODO: Move this to the explore state and lose the PriceContext
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

      {prices ? <ExploreFetch /> : null}

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
