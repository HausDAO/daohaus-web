import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '3box/lib/api';
import makeBlockie from 'ethereum-blockies-base64';

import { truncateAddr } from '../../util/helpers';
import { TokenContext, Web3Context } from '../../contexts/ContractContexts';

import './ApplicantItem.scss';

const ApplicantItem = props => {
  const { applicant, daoData, contract } = props;

  const [currentApplicant, setCurrentApplicant] = useState([]);
  const [web3Service] = useContext(Web3Context);
  const [tokenService] = useContext(TokenContext);

  useEffect(() => {
    const setup = async () => {
      if (applicant.applicantAddress && contract) {
        const _applicant = applicant.applicantAddress;

        let profile;
        try {
          profile = await getProfile(_applicant);
        } catch {
          profile = {};
        }

        if (daoData.tokenInfo.address && tokenService) {
          const allowance = await tokenService.allowance(
            _applicant,
            daoData.id,
          );
          const balanceOf = await tokenService.balanceOf(_applicant);

          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            {
              addr: _applicant,
              inEth: web3Service.fromWei(allowance),
              balanceOf: web3Service.fromWei(balanceOf),
              profile: profile,
            },
          ]);
        } else {
          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            { addr: _applicant, inEth: '', balanceOf: '', profile: {} },
          ]);

          return false;
        }
      }
    };
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  applicant.status = 'New Pledge';

  const applicantProfile = currentApplicant.find(
    item => item.addr === applicant.applicantAddress,
  );

  return (
    <Link to={`/profile/${applicant.applicantAddress}`}>
      <div className="Row MemberInfo">
        <p>{applicant.status}</p>
        {applicant.status === 'New Pledge' ? (
          <p>Requesting {applicant.shares} Shares</p>
        ) : (
          <p>{applicant.shares} Shares</p>
        )}
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
                applicant.applicantAddress,
              )}")`,
            }}
          >
            {''}
          </div>
        )}
        <div className="ProfileInfo__Pseudo">
          {applicantProfile &&
          applicantProfile.profile &&
          applicantProfile.profile.name ? (
            <h2>
              {applicantProfile.profile.name}{' '}
              {applicantProfile.profile.emoji ? (
                <span>{applicantProfile.profile.emoji}</span>
              ) : null}
            </h2>
          ) : null}
          <p>{truncateAddr(applicant.applicantAddress)}</p>
        </div>
      </div>
      {applicant.status === 'New Pledge' && (
        <div className="Row PledgeInfo">
          {applicantProfile && <p>{'' + applicantProfile.inEth} approved</p>}

          {applicantProfile &&
          parseInt(applicantProfile.inEth) <=
            parseInt(applicantProfile.balanceOf) ? (
            <p className="Success">Tribute ready</p>
          ) : (
            <p className="Danger">Insufficient funds</p>
          )}
        </div>
      )}
    </Link>
  );
};

export default ApplicantItem;
