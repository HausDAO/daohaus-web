import React from 'react';
import { Link } from 'react-router-dom';
import DaoCard from '../daoCard/DaoCard';

import './DaoList.scss';

const DaoList = props => {
  const { daos } = props;

  const daoList = daos.map(dao => {
    return (
      <div className="DaoList__Item" key={dao.moloch}>
        <Link to={`/dao/${dao.moloch}`}>
          <DaoCard dao={dao} />
        </Link>
      </div>
    );
  });

  return (
    <div className="View">
      <h3>All Daos</h3>
      <div className="DaoList">{daoList}</div>
    </div>
  );
};

export default DaoList;
