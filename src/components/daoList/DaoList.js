import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import DaoCard from '../daoCard/DaoCard';
import { ExploreContext } from '../../contexts/ExploreContext';

import './DaoList.scss';

const DaoList = () => {
  const [daos, setDaos] = useState([]);
  const { state } = useContext(ExploreContext);

  useEffect(() => {
    let searchedDaos;
    if (state.searchTerm) {
      searchedDaos = state.allDaos.filter(dao => {
        return dao.title.toLowerCase().indexOf(state.searchTerm) > -1;
      });
    } else {
      searchedDaos = state.allDaos;
    }

    const filteredDaos = searchedDaos.filter(dao => {
      const memberCount = dao.members.length > (state.filters.members[0] || 0);
      const versionMatch = state.filters.versions.includes(dao.version);
      return !dao.apiData.hide && memberCount && versionMatch;
    });

    const sortedDaos = _.orderBy(
      filteredDaos,
      [
        'dao',
        dao => {
          if (state.sort.count) {
            return dao[state.sort.value].length;
          } else {
            if (state.sort.value2) {
              return dao[state.sort.value][state.sort.value2];
            } else {
              return dao[state.sort.value];
            }
          }
        },
      ],
      ['desc', 'desc'],
    );

    setDaos(sortedDaos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sort, state.filters, state.searchTerm]);

  const daoList = daos.map(dao => {
    return (
      <div className="DaoList__Item" key={dao.id}>
        <Link
          to={dao.version === '2' ? `/dao/v2/${dao.id}` : `/dao/v1/${dao.id}`}
        >
          <DaoCard dao={dao} />
        </Link>
      </div>
    );
  });

  return (
    <div className="Contain">
      {daos.length ? <div className="DaoList">{daoList}</div> : null}
    </div>
  );
};

export default DaoList;
