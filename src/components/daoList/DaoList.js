import React from "react";
import { Link } from 'react-router-dom';
import DaoCard from '../daoCard/DaoCard'

import "./DaoList.css"

const DaoList = (props) => {
  const { daos } = props;

  const daoList = daos.map(dao => {
    return (
      <div className="DaoList__item" key={dao.contractAddress}>
        <Link to={`dao/${dao.contractAddress}`}>
          <DaoCard dao={dao} />
        </Link>
      </div>
    );
  })


  return (
    <div>
      <h3>DAOs</h3>
      {daoList}
    </div>
    
  );
};

export default DaoList;
