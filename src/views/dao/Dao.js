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
      console.log('molochService', molochService)

      const totalShares = await molochService.getTotalShares()
      const token = await molochService.approvedToken()
      console.log('totalShares', totalShares)
      console.log('token', token)
      setContractData({totalShares, token})
    };


    fetchData();
  }, [props.match.params.contractAddress]);

  return (
  <div className="View">
      <h1>DAO Page</h1>
      {daoData.contractAddress ? (
        <div>
          <h2>{daoData.name}</h2>
          <p>{daoData.description}</p>
          
          <p className="Label">Shares</p>
          <p className="Value Data">{contractData.totalShares}</p>
          <p className="Label">Summoner</p>
          <p className="Value Data">{daoData.summonerAddress}</p>
          <h4>Minimum Tribute</h4>
          <p>{daoData.minimumTribute} {contractData.token}</p>
          <ApplyButton contractAddress={daoData.contractAddress}/>
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
    </div>
  );
};

export default Dao;
