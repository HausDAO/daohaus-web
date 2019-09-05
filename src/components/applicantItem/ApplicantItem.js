import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "3box/lib/api";
import makeBlockie from "ethereum-blockies-base64";

import { truncateAddr } from "../../util/helpers";

import "./ApplicantItem.scss";
import MolochService from "../../util/molochService";
import Web3Service from "../../util/web3Service";
import WethService from "../../util/wethService";
import DaiService from "../../util/daiService";

const ApplicantItem = props => {
  const { applicant, daoData } = props;
  const [currentApplicant, setCurrentApplicant] = useState([]);
  const molochService = new MolochService(daoData.contractAddress);


  useEffect(() => {
    const web3Service = new Web3Service();
    const wethService = new WethService();
    const daiService = new DaiService();
    const setup = async () => {
      if (applicant.applicantAddress) {
        const _applicant = applicant.applicantAddress;
        const daoToken = await molochService.approvedToken();
        let profile;
        try {
          profile = await getProfile(_applicant);
        } catch {
          profile = {};
        }
        if (daoToken === "Weth") {
          const allowance = await wethService.allowance(
            _applicant,
            daoData.contractAddress
          );
          const balanceOf = await wethService.balanceOf(_applicant);
          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            {
              addr: _applicant,
              inEth: web3Service.fromWei(allowance),
              balanceOf: web3Service.fromWei(balanceOf)
            }
          ]);

          return true;
        } else if (daoToken === "Dai") {
          const allowance = await daiService.allowance(
            _applicant,
            daoData.contractAddress
          );
          const balanceOf = await daiService.balanceOf(_applicant);

          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            {
              addr: _applicant,
              inEth: web3Service.fromWei(allowance),
              balanceOf: web3Service.fromWei(balanceOf),
              profile: profile
            }
          ]);

          return true;
        } else {
          setCurrentApplicant(currentApplicant => [
            ...currentApplicant,
            { addr: _applicant, inEth: "", balanceOf: "", profile: {} }
          ]);

          return false;
        }
      }
    };
    setup();
  }, [applicant.applicantAddress]);

  if (applicant.shares === "0") {
    applicant.status = "Zero share member";
  }

  if (
    applicant.applicantAddress.toLowerCase() ===
    daoData.summonerAddress.toLowerCase()
  ) {
    applicant.status = "Summoner";
  }

  if (applicant.status === "new") {
    applicant.status = "New Pledge";
  }

  if (!applicant.status) {
    applicant.status = "Member";
  }

  const applicantProfile = currentApplicant.find(
    item => item.addr === applicant.applicantAddress
  );

  return (
    <Link to={`/profile/${applicant.applicantAddress}`}>
      <div className="Row MemberInfo">
        <p>{applicant.status}</p>
        {applicant.status === "New Pledge" ? (
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
              backgroundImage: `url(${"https://ipfs.infura.io/ipfs/" +
                applicantProfile.profile.image[0].contentUrl["/"]})`
            }}
          >
            {""}
          </div>
        ) : (
          <div
            className="ProfileImgCard"
            style={{
              backgroundImage: `url("${makeBlockie(
                applicant.applicantAddress
              )}")`
            }}
          >
            {""}
          </div>
        )}
        <div>
        {applicantProfile &&
        applicantProfile.profile &&
        applicantProfile.profile.name ? (
          <h2>
            {applicantProfile.profile.name}{" "}
            {applicantProfile.profile.emoji ? (
              <span>{applicantProfile.profile.emoji} </span>
            ) : null}
          </h2>
          
        ) : null}
        <p>{truncateAddr(applicant.applicantAddress)}</p>
        </div>
      </div>
      {applicant.status === "New Pledge" && (
        <div className="Row PledgeInfo">
          {applicantProfile && <p>{"" + applicantProfile.inEth} approved</p>}
          {applicantProfile &&
          applicantProfile.inEth < applicantProfile.balanceOf ? (
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
