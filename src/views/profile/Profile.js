import React, { useState, useEffect } from "react";
import { useWeb3Context } from 'web3-react'

import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import ApplicationShortList from "../../components/applicationList/ApplicationShortList";

const Profile = () => {
  const context = useWeb3Context()
  const [molochs, setMolochs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`)
      setMolochs(daoRes.data.filter(moloch => {
        return moloch.summonerAddress === context.account
      }));

      const applicationRes = await get(`applications/${context.account}`)
      setApplications(applicationRes.data);
    };

    fetchData();
  }, [context.account]);

  return (
    <>
      <h1>Profile</h1>

      {molochs.length ? (
        <>
          <h2>I am the summoner of these Molochs</h2>
          <DaoList daos={molochs} />
        </>
        ) : null}

      {applications.length ? (
        <>
          <ApplicationShortList applications={applications} />
          <h2>I have applied to these Molochs</h2>
        </>
      ) : null}
    </>
  );
};

export default Profile;
