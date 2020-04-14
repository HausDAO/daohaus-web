import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import makeBlockie from 'ethereum-blockies-base64';
import { getProfile } from '3box/lib/api';

import { truncateAddr } from '../../util/helpers';
import { Web3Context } from '../../contexts/ContractContexts';

import '../../views/gas/Gas.scss';

const GasLeaderItem = ({ leader, i }) => {
  const [leaderProfile, setLeaderProfile] = useState();
  const [web3Service] = useContext(Web3Context);

  console.log('leader', leader);

  useEffect(() => {
    const setup = async () => {
      let profile;
      try {
        profile = await getProfile(leader.memberAddress);

        console.log('profile', profile);
        setLeaderProfile(profile);
      } catch {
        profile = {};
      }
    };
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Gas__leader">
      <p className="profileRank">{i + 1}.</p>

      <Link to={`/profile/${leader.memberAddress}`}>
        <div className="profileColumn">
          {leaderProfile && leaderProfile.image && leaderProfile.image[0] ? (
            <div
              className="ProfileImgCard"
              style={{
                backgroundImage: `url(${'https://ipfs.infura.io/ipfs/' +
                  leaderProfile.image[0].contentUrl['/']})`,
              }}
            >
              {''}
            </div>
          ) : (
            <div
              className="ProfileImgCard"
              style={{
                backgroundImage: `url("${makeBlockie(leader.memberAddress)}")`,
              }}
            >
              {''}
            </div>
          )}
          <div className="profileAddress">
            {truncateAddr(leader.memberAddress)}
          </div>
        </div>
      </Link>

      <p>{web3Service.fromWei(leader.totalGas)} Ξ</p>
    </div>
  );
};

export default GasLeaderItem;
