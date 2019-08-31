import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

import "./ApplicationList.scss";
import MolochService from "../../util/molochService";
import Web3Service from "../../util/web3Service";
import WethService from "../../util/wethService";
import DaiService from "../../util/daiService";

const ApplicationList = props => {
  const { applications, daoData } = props;
  const [applicants, setApplicants] = useState({});

  console.log("*************daoDATA", daoData);

  const currentBalance = async applicant => {
    const molochService = new MolochService(daoData.contractAddress);
    const web3Service = new Web3Service();
    const wethService = new WethService();
    const daiService = new DaiService();
    const balance = {};
    balance[applicant] = {};

    const daoToken = await molochService.approvedToken();
    if (daoToken === "Weth") {
      console.log("WETH", applicant);
      balance[applicant].allowance = await wethService.allowance(
        applicant,
        daoData.contractAddress
      );
      balance[applicant].allowanceEth = web3Service.fromWei(
        balance[applicant].allowance
      );

      balance[applicant].balanceOf = await wethService.balanceOf(applicant);
      console.log("allowance", balance[applicant].allowance);
    } else if (daoToken === "Dai") {
      balance[applicant].allowance = await daiService.allowance(
        applicant,
        daoData.contractAddress
      );
      balance[applicant].allowanceEth = web3Service.fromWei(
        balance[applicant].allowance
      );
      balance[applicant].balanceOf = await daiService.balanceOf(applicant);
    } else {
      return false;
    }

    balance[applicant].cover = balance.allowance > balance.balanceOf;
    console.log("-=-=-=-=-=-=-=-=-=-=-=");
    console.log({ ...applicants, ...balance });
    setApplicants({ ...applicants, ...balance });
  };

  const applicationList = applications
    .sort(function(a, b) {
      return a.shares - b.shares;
    })
    .map((application, i) => {
      if (application.shares === "0") {
        application.status = "Zero share member";
      }

      if (
        application.applicantAddress.toLowerCase() ===
        daoData.summonerAddress.toLowerCase()
      ) {
        application.status = "Summoner";
      }

      if (application.status === "new") {
        application.status = "New Pledge";
        currentBalance(application.applicantAddress);
      }

      if (!application.status) {
        application.status = "Member";
      }

      return (
        <div key={i} className="ApplicationList__Item">
          <Link to={`/profile/${application.applicantAddress}`}>
            <div className="Row MemberInfo">
              <p>{application.status}</p>
              <p>Requesting {application.shares} Shares</p>
            </div>
            <ProfileHover address={application.applicantAddress} />
            {applicants[application.applicantAddress] &&
              application.status === "New Pledge" && (
                <div className="Row PledgeInfo">
                  <p>
                    {"" + applicants[application.applicantAddress].allowanceEth} approved
                  </p>
                  { applicants[application.applicantAddress].cover ? (
                    <p className="Success">Tribute ready</p>
                  ): (<p className="Danger">Insufficient funds</p>)
                  }
                </div>
              )}
          </Link>
        </div>
      );
    });

  return <>{applicationList}</>;
};

export default ApplicationList;
