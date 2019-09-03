import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

import "./ApplicantItem.scss";
import MolochService from "../../util/molochService";
import Web3Service from "../../util/web3Service";
import WethService from "../../util/wethService";
import DaiService from "../../util/daiService";

const ApplicantItem = props => {
  const { applicant, daoData } = props;
  const [currentApplicant, setCurrentApplicant] = useState([]);

  const molochService = new MolochService(daoData.contractAddress);
  const web3Service = new Web3Service();
  const wethService = new WethService();
  const daiService = new DaiService();

  useEffect(() => {
    const setup = async () => {
      await userValues(applicant.applicantAddress);
    };
    setup();
  }, [applicant.applicantAddress]);

  const userValues = async applicant => {
    const daoToken = await molochService.approvedToken();
    if (daoToken === "Weth") {
      console.log("WETH", applicant);
      const allowance = await wethService.allowance(
        applicant,
        daoData.contractAddress
      );
      const balanceOf = await wethService.balanceOf(applicant);
      setCurrentApplicant(currentApplicant => [
        ...currentApplicant,
        {
          addr: applicant,
          inEth: web3Service.fromWei(allowance),
          balanceOf: web3Service.fromWei(balanceOf)
        }
      ]);

      return true;
    } else if (daoToken === "Dai") {
      const allowance = await daiService.allowance(
        applicant,
        daoData.contractAddress
      );
      const balanceOf = await daiService.balanceOf(applicant);

      setCurrentApplicant(currentApplicant => [
        ...currentApplicant,
        {
          addr: applicant,
          inEth: web3Service.fromWei(allowance),
          balanceOf: web3Service.fromWei(balanceOf)
        }
      ]);

      return true;
    } else {
      setCurrentApplicant(currentApplicant => [
        ...currentApplicant,
        { addr: applicant, inEth: "", balanceOf: "" }
      ]);

      return false;
    }
  };

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
      <ProfileHover address={applicant.applicantAddress} />
      {applicant.status === "New Pledge" && (
        <div className="Row PledgeInfo">
          {currentApplicant.find(
            item => item.addr === applicant.applicantAddress
          ) && (
            <p>
              {"" +
                currentApplicant.find(
                  item => item.addr === applicant.applicantAddress
                ).inEth}{" "}
              approved
            </p>
          )}
          {currentApplicant.find(
            item => item.addr === applicant.applicantAddress
          ) &&
          currentApplicant.find(
            item => item.addr === applicant.applicantAddress
          ).inEth <
            currentApplicant.find(
              item => item.addr === applicant.applicantAddress
            ).balanceOf ? (
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
