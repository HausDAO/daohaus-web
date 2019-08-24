import React, { useState, useEffect } from "react";
import { get } from "../../util/requests";
import ApplicationList from "../../components/applicationList/ApplicationList";
import ApplyButton from "../../components/applyButton/applyButton";
import MolochService from "../../util/molochService";

const Dao = props => {
  const [daoData, setDaoData] = useState({});
  const [applications, setApplications] = useState({});
  const [contractData, setContractData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/${props.match.params.contractAddress}`)
      setDaoData(daoRes.data)

      const applicationRes = await get(`moloch/${props.match.params.contractAddress}/applications`)
      setApplications(applicationRes.data)

      const molochService = new MolochService('0x0372f3696fa7dc99801f435fd6737e57818239f2');
      const totalShares = await molochService.getTotalShares()
      const token = await molochService.approvedToken()
      setContractData({totalShares, token})
    };


    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <>
      <h1>DAO Page</h1>
      {daoData.contractAddress ? (
        <div>
          <p>{daoData.name}</p>
          <ApplyButton contractAddress={daoData.contractAddress}/>
          <p>Shares: {contractData.totalShares}</p>
          <p>Description: {daoData.description}</p>
          <p>Summoner: {daoData.summonerAddress}</p>
          <p>Pledge Info</p>
          <p>Minimum Tribute: {daoData.minimumTribute} {contractData.token}</p>
          {applications.length ? (
        <>
          <h3>Pledges</h3>
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
