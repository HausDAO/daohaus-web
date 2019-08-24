import React from "react";

const DaoCard = (props) => {
  const { dao } = props;

  return (
    <>
      {dao.contractAddress ? (
        <div>
          <p>{dao.name}</p>
          <p>{dao.description}</p>
          <p>Summoner: {dao.summonerAddress}</p>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
        )}
    </>
  );
};

export default DaoCard;
