import React, { useState, useEffect, Fragment } from "react";
import { get } from "../../util/requests";

const Dao = props => {
  const [daoData, setDaoData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/${props.match.params.contractAddress}`)
      setDaoData(daoRes.data)
    };

    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <Fragment>
      <h1>DAO Page</h1>
      {daoData.contractAddress ? (
        <div>
          <p>{daoData.name}</p>
          <p>{daoData.description}</p>
          <p>Summoner: {daoData.summonerAddress}</p>
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
      )}
    </Fragment>
  );
};

export default Dao;
