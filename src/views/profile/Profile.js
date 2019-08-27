import React, { useState, useEffect } from "react";
import { getProfile } from "3box/lib/api";

import { get } from "../../util/requests";
import DaoList from "../../components/daoList/DaoList";
import ApplicationShortList from "../../components/applicationList/ApplicationShortList";

const Profile = props => {
  const [molochs, setMolochs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({});
  const account = props.match.params.account;

  useEffect(() => {
    const fetchData = async () => {
      const daoRes = await get(`moloch/`);
      setMolochs(
        daoRes.data.filter(moloch => {
          return moloch.summonerAddress === account;
        })
      );

      const applicationRes = await get(`applications/${account}`);
      setApplications(applicationRes.data);
      let profile = {};
      try {
        profile = await getProfile(account);
        //console.log('profile', profile);
      } catch (err) {
        console.log(err);
      }

      setProfile(profile);
    };

    fetchData();
  }, [account]);

  return (
    <div className="View">
      <h1>Profile</h1>
      {account}

      {profile.name ? (
        <p>
          {profile.name}
          {profile.emoji ? <span>{profile.emoji}</span> : null}
        </p>
      ) : null}

      {profile.website ? <p>{profile.website}</p> : null}

      {molochs.length ? (
        <>
          <h2>Summoner of these Molochs</h2>
          <DaoList daos={molochs} />
        </>
      ) : null}

      {applications.length ? (
        <>
          <h2>Applied to these Molochs</h2>
          <ApplicationShortList applications={applications} />
        </>
      ) : null}
    </div>
  );
};

export default Profile;
