import React from "react";
import { Link } from 'react-router-dom';
import './DaoCard.scss';

const DaoCard = (props) => {
  const { dao } = props;

  return (
    <>
      {dao.contractAddress ? (
        <div className="DaoCard">
          <h4 className="DaoName">{dao.name}</h4>
          <p>{dao.description}</p>
          <p>Summoner</p>
          <Link to={'/'}><span className="Data">{dao.summonerAddress}</span></Link>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
        )}
    </>
  );
};

export default DaoCard;
