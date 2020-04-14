import React from 'react';
import { Link } from 'react-router-dom';

import DaoCard from '../daoCard/DaoCard';

import './DaoList.scss';

const DaoList = ({ daos }) => {
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
      {daos ? <div className="DaoList">{daoList}</div> : null}
    </div>
  );
};

export default DaoList;
