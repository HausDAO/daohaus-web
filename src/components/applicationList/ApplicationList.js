import React from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

import "./ApplicationList.scss";

const ApplicationList = props => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i} className="Applicant__List">
        <Link to={`/profile/${application.applicantAddress}`}>
          <p>{application.applicantAddress}</p>
          <p>{application.name}</p>
          <p>{application.bio}</p>
        </Link>
        <ProfileHover address={application.applicantAddress} />
      </div>
    );
  });

  return <>{applicationList}</>;
};

export default ApplicationList;
