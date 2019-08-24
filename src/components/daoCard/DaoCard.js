import React from "react";
import './DaoCard.scss';

const DaoCard = (props) => {
  const { dao } = props;

  return (
    <>
      {dao.contractAddress ? (
        <div className="DaoCard">
          <h4>{dao.name}</h4>
          <p>{dao.description}</p>
          <p>Summoner</p>
          <span className="Data">{dao.summonerAddress}</span>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
        )}
    </>
  );
};

export default DaoCard;
