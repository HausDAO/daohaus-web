import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getProfile } from '3box/lib/api';
import makeBlockie from 'ethereum-blockies-base64';

import { truncateAddr } from '../../util/helpers';

import './MemberItem.scss';

const MemberItem = props => {
  const { applicant, daoData, contract } = props;
  const [currentApplicant, setCurrentApplicant] = useState([]);

  useEffect(() => {
    const setup = async () => {
      if (applicant.id.split('-')[1] && contract) {
        const _applicant = applicant.id.split('-')[1];

        let profile;
        try {
          profile = await getProfile(_applicant);
        } catch {
          profile = {};
        }
        setCurrentApplicant(currentApplicant => [
          ...currentApplicant,
          { addr: _applicant, profile },
        ]);

        return true;
      } else {
        setCurrentApplicant(currentApplicant => [
          ...currentApplicant,
          { addr: {}, profile: {} },
        ]);

        return false;
      }
    };
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    applicant.id.split('-')[1].toLowerCase() ===
    daoData.summonerAddress.toLowerCase()
  ) {
    applicant.status = 'Summoner';
  } else {
    applicant.status = 'Member';
  }

  const applicantProfile = currentApplicant.find(
    item => item.addr === applicant.id.split('-')[1],
  );

  return (
    <Link to={`/profile/${applicant.id.split('-')[1]}`}>
      <div className="Row MemberInfo">
        <p>{applicant.status}</p>
        <p>{applicant.shares} Shares</p>
      </div>
      <div className="Row ProfileInfo">
        {applicantProfile &&
        applicantProfile.profile &&
        applicantProfile.profile.image &&
        applicantProfile.profile.image[0] ? (
          <div
            className="ProfileImgCard"
            style={{
              backgroundImage: `url(${'https://ipfs.infura.io/ipfs/' +
                applicantProfile.profile.image[0].contentUrl['/']})`,
            }}
          >
            {''}
          </div>
        ) : (
          <div
            className="ProfileImgCard"
            style={{
              backgroundImage: `url("${makeBlockie(
                applicant.id.split('-')[1],
              )}")`,
            }}
          >
            {''}
          </div>
        )}
        <div>
          {applicantProfile &&
          applicantProfile.profile &&
          applicantProfile.profile.name ? (
            <h2>
              {applicantProfile.profile.name}{' '}
              {applicantProfile.profile.emoji ? (
                <span>{applicantProfile.profile.emoji} </span>
              ) : null}
            </h2>
          ) : null}
          <p>{truncateAddr(applicant.id.split('-')[1])}</p>
        </div>
      </div>
    </Link>
  );
};

export default MemberItem;
