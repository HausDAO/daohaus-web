import React, { useState, useEffect } from 'react';
import { getProfile } from '3box/lib/api';
import { useWeb3Context } from 'web3-react';

import { get } from '../../util/requests';
import { useQuery } from 'react-apollo';
import { GET_MOLOCHES } from '../../util/queries';
import DaoList from '../../components/daoList/DaoList';
import ApplicationMolochList from '../../components/applicationList/ApplicationMolochList';
import UnregisteredList from '../../components/unregisteredList/unregisteredList';

const Profile = props => {
  const context = useWeb3Context();
  const [applications, setApplications] = useState([]);
  const [summonedDaos, setSummonedDaos] = useState([]);
  const [unregisteredDaos, setUnregisteredDaos] = useState([]);

  const [profile, setProfile] = useState({});
  const { loading, error, data } = useQuery(GET_MOLOCHES);

  const filterDaos = daos => {
    return daos
      .filter(
        dao =>
          !dao.apiData.hide &&
          dao.summoner.toLowerCase() ===
            props.match.params.account.toLowerCase(),
      )
      .reverse();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const applicationRes = await get(
          `applications/${props.match.params.account}`,
        );

        const validApplications = applicationRes.data.filter(app => {
          return !data.factories.find(
            dao => dao.moloch === app.molochContractAddress,
          ).apiData.hide;
        });
        setApplications(validApplications);

        const profile = await getProfile(props.match.params.account);
        setProfile(profile);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data) {
      setSummonedDaos(filterDaos(data.factories));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const fetchOrphans = async () => {
      if (context.account) {
        const orphans = await get(
          `moloch/orphans/${props.match.params.account}`,
        );
        setUnregisteredDaos(
          orphans.data.filter(orphan => {
            return orphan.summonerAddress === context.account.toLowerCase();
          }),
        );
      }
    };

    fetchOrphans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.account]);

  const renderUnregisteredList = () => {
    return unregisteredDaos.map((dao, i) => {
      return <UnregisteredList dao={dao} key={i} />;
    });
  };

  return (
    <div className="View">
      <div className="Row">
        <h1>Profile</h1>
        {context.account === props.match.params.account && (
          <a
            href="https://3box.io/hub"
            target="_blank"
            rel="noreferrer noopener"
          >
            Manage on 3Box
          </a>
        )}
      </div>

      {profile.image && profile.image[0] ? (
        <div
          className="ProfileImg"
          style={{
            backgroundImage: `url(${'https://ipfs.infura.io/ipfs/' +
              profile.image[0].contentUrl['/']})`,
          }}
        >
          {''}
        </div>
      ) : null}

      {profile.name ? (
        <h2>
          {profile.name} {profile.emoji ? <span>{profile.emoji} </span> : null}
        </h2>
      ) : null}

      <p className="Data">{props.match.params.account}</p>

      {profile.description ? <p>{profile.description}</p> : null}

      {profile.website ? (
        <>
          {profile.website.indexOf('http') > 0 ? (
            <a
              href={profile.website.match}
              target="_blank"
              rel="noreferrer noopener"
            >
              {profile.website}
            </a>
          ) : (
            <p>{profile.website}</p>
          )}
        </>
      ) : null}
      {loading ? <p>Loading</p> : null}
      {error ? <p>Error - are you on mainnet?</p> : null}

      {unregisteredDaos.length ? (
        <div className="Section">
          <h2>Unregistered Moloch V2 Daos</h2>
          {renderUnregisteredList()}
        </div>
      ) : null}

      {data && summonedDaos.length ? (
        <div className="Section">
          <h2>Summoner of these Molochs</h2>
          <DaoList daos={summonedDaos} />
        </div>
      ) : null}

      {applications.length ? (
        <>
          <h2>Pledged to these Molochs</h2>
          <ApplicationMolochList applications={applications} />
        </>
      ) : null}
    </div>
  );
};

export default Profile;
