import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DaoSuperCard from '../daoCard/DaoSuperCard';

import './DaoList.scss';

const DaoSuperList = ({ daos }) => {
  const daoList = daos.map(dao => {
    return (
      <div className="DaoList__Item" key={dao.id}>
        <Link
          to={dao.version === '2' ? `/dao/v2/${dao.id}` : `/dao/v1/${dao.id}`}
        >
          <DaoSuperCard dao={dao} />
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

export default DaoSuperList;
