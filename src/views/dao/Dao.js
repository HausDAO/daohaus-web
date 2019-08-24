import React, { useState, useEffect } from "react";
import { get } from "../../util/requests";
import ApplicationList from "../../components/applicationList/ApplicationList";

const Dao = props => {
  const [daoData, setDaoData] = useState({});
  const [applications, setApplications] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/${props.match.params.contractAddress}`)
      setDaoData(daoRes.data)

      const applicationRes = await get(`moloch/${props.match.params.contractAddress}/applications`)
      setApplications(applicationRes.data)
    };


    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <>
      <h1>DAO Page</h1>
      {daoData.contractAddress ? (
        <div>
          <p>{daoData.name}</p>
          <p>{daoData.description}</p>
          <p>Summoner: {daoData.summonerAddress}</p>
          {applications.length ? (
        <>
          <h3>Applications</h3>
          <ApplicationList applications={applications} />
        </>
      ) : null}
        </div>
      ) : (
        <p>THE HAUS IS LOADING THE DAO</p>
      )}
    </>
  );
};

export default Dao;
