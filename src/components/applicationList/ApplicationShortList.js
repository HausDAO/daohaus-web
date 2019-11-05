import React from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

import "./ApplicationList.scss";

const ApplicationShortList = props => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i} className="Applicant__List">
        <Link className="List--Item" to={`/profile/${application.applicantAddress}`}>
          {application.moloch.name}
        </Link>
      </div>
    );
  });

  return <div>{applicationList}</div>;
};

export default ApplicationShortList;
