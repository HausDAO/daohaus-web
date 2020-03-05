import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './DaoFilter.scss';

const DaoFilter = props => {
  const { daos, setFilteredDaos } = props;
  const [matchingDaos, setMatchingDaos] = useState();

  useEffect(() => {
    resetDaos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daos]);

  const filterAttribute = dao => {
    if (dao.apiData.length === 0) {
      return 0;
    } else {
      return +dao.apiData.version === 2
        ? dao.totalShares
        : +dao.tokenInfo.guildBankValue;
    }
  };

  const resetDaos = () => {
    const unhidden = _.sortBy(
      daos.filter(dao => !dao.apiData.hide),
      dao => {
        return filterAttribute(dao);
      },
    ).reverse();

    setMatchingDaos(unhidden);
    setFilteredDaos(unhidden);
  };

  const handleChange = event => {
    if (event.target.value) {
      const filtered = _.sortBy(
        daos.filter(dao => {
          return (
            !dao.apiData.hide &&
            dao.title.toLowerCase().indexOf(event.target.value.toLowerCase()) >
              -1
          );
        }),
        dao => {
          return filterAttribute(dao);
        },
      ).reverse();

      setMatchingDaos(filtered);
      setFilteredDaos(filtered);
    } else {
      resetDaos();
    }
  };

  return (
    <div className="View">
      <div className="DaoFilter">
        <h3 className="DaoFilter__title">
          Daos ({matchingDaos && matchingDaos.length})
        </h3>
        <div className="DaoFilter__search">
          <input
            type="search"
            className="input"
            placeholder="Search Daos"
            onChange={e => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default DaoFilter;
