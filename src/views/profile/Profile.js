import React, { useState, useEffect, useContext } from 'react';
import { getProfile } from '3box/lib/api';

import { get } from '../../util/requests';
import { useQuery } from 'react-apollo';
import { GET_MEMBER_MOLOCHES } from '../../util/queries';
import UnregisteredList from '../../components/unregisteredList/unregisteredList';
import { Web3Context } from '../../contexts/ContractContexts';
import ProfileMemberList from '../../components/ProfileMemberList/ProfileMemberList';

import './Profile.scss';
import ProfileActivityFeed from '../../components/ActivityFeed/ProfileActivityFeed';

const Profile = props => {
  const [memberDaos, setMemberDaos] = useState([]);
  const [web3context] = useContext(Web3Context);

  const [unregisteredDaos, setUnregisteredDaos] = useState([]);

  const [profile, setProfile] = useState({});

  const { loading, error, data } = useQuery(GET_MEMBER_MOLOCHES, {
    variables: { memberAddress: props.match.params.account },
  });

  useEffect(() => {
    const setup = async () => {
      let profile;
      try {
        profile = await getProfile(props.match.params.account);
      } catch {
        profile = {};
      }
      setProfile(profile);
    };

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setMemberDaos(data.members.map(member => member.moloch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const fetchOrphans = async () => {
      if (web3context && web3context.account) {
        const orphans = await get(
          `moloch/orphans/${props.match.params.account}`,
        );

        console.log('orphans', orphans);
        setUnregisteredDaos(
          orphans.data.filter(orphan => {
            return orphan.summonerAddress === web3context.account.toLowerCase();
          }),
        );
      }
    };

    fetchOrphans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3context]);

  const renderUnregisteredList = () => {
    return unregisteredDaos.map((dao, i) => {
      return <UnregisteredList dao={dao} key={i} />;
    });
  };

  return (
    <>
      <div className="ProfileHero">
        <div className="Profile__id">
          <div>
            <div className="Profile__id--Header">
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
              <div className="Account">
                {profile.name ? (
                  <h2>
                    {profile.name}{' '}
                    {profile.emoji ? <span>{profile.emoji} </span> : null}
                  </h2>
                ) : null}
                <p className="Data">{props.match.params.account}</p>
              </div>
            </div>

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

            {web3context && web3context.account === props.match.params.account && (
              <a
                href="https://3box.io/hub"
                target="_blank"
                rel="noreferrer noopener"
              >
                Edit Profile on 3Box
              </a>
            )}
          </div>
          <div>
            <div className="Profile__balances">
              <div className="Profile__balances--Boosts">
                <p>Boosts</p>
                <p>0</p>
              </div>
              <div className="Profile__balances--HAUS">
                <p>$HAUS</p>
                <p>Coming soon :)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="View">
        {loading ? <p>Loading</p> : null}
        {error ? <p>Error - are you on mainnet?</p> : null}

        {unregisteredDaos.length ? (
          <>
            <h2>Unregistered Moloch V2 Daos</h2>
            {renderUnregisteredList()}
          </>
        ) : null}

        {data && memberDaos.length ? (
          <>
            <ProfileMemberList daos={memberDaos} />
            <ProfileActivityFeed daos={memberDaos} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
