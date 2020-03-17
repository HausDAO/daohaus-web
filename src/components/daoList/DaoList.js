import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DaoCard from '../daoCard/DaoCard';

import './DaoList.scss';

const DaoList = props => {
  const { daos, version, v2Moloches } = props;
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    if (daos) {
      setMergedData(
        version === '1'
          ? daos
          : daos.map((dao, i) => {
              dao.metadata = v2Moloches.find(v2 => {
                return v2.id === dao.id;
              });
              return dao;
            }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daos]);

  const daoList = mergedData.map(dao => {
    return (
      <div className="DaoList__Item" key={dao.moloch}>
        <Link
          to={
            dao.version === '2'
              ? `/dao/v2/${dao.moloch}`
              : `/dao/v1/${dao.moloch}`
          }
        >
          <DaoCard dao={dao} />
        </Link>
      </div>
    );
  });

  return (
    <div className="Contain">
      {mergedData ? <div className="DaoList">{daoList}</div> : null}
    </div>
  );
};

export default DaoList;
