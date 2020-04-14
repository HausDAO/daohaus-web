import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import DaoList from '../daoList/DaoList';

import './DaoFilter.scss';

const DaoFilter = props => {
  const { daos, version, v2Moloches } = props;

  const [filteredDaos, setFilteredDaos] = useState();
  const [matchingDaos, setMatchingDaos] = useState();

  useEffect(() => {
    resetDaos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daos]);

  const sortAttribute = dao => {
    if (dao.apiData.length === 0) {
      return 0;
    } else {
      return +dao.apiData.version === 2
        ? +dao.index
        : +dao.tokenInfo.guildBankValue;
    }
  };

  const resetDaos = () => {
    let unhidden = _.sortBy(
      daos.filter(dao => !dao.apiData.hide),
      dao => {
        return sortAttribute(dao);
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
          return sortAttribute(dao);
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

          <div>
            <label>
              <input type="radio" value="all" checked={true} />
              All
            </label>
            <label>
              <input type="radio" value="1" checked={true} />
              V1
            </label>
            <label>
              <input type="radio" value="2" checked={true} />
              V2
            </label>
          </div>
        </div>
      </div>
      <div className="Block Primary Home__Daolist">
        {filteredDaos ? (
          <DaoList
            daos={filteredDaos}
            version={version}
            v2Moloches={v2Moloches}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DaoFilter;
