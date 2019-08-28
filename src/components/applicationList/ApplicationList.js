import React from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

import "./ApplicationList.scss";

const ApplicationList = props => {
  const { applications, summoner } = props;

  const applicationList = applications
    .sort(function(a, b) {
      return a.shares - b.shares;
    })
    .map((application, i) => {
      application.status = "member";

      if (application.shares === "0") {
        application.status = "zero share member";
      }

      if (application.applicantAddress === summoner) {
        application.status = "summoner";
      }

      return (
        <div key={i} className="Applicant__List">
          <Link to={`/profile/${application.applicantAddress}`}>
            <p>Shares: {application.shares}</p>
            <p>{application.status}</p>
          </Link>
          <ProfileHover address={application.applicantAddress} />
        </div>
      );
    });

  return <>{applicationList}</>;
};

export default ApplicationList;
