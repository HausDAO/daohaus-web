import React from "react";
import { Link } from "react-router-dom";
import ProfileHover from "profile-hover";

const ApplicationShortList = props => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i}>
        <Link to={`/profile/${application.applicantAddress}`}>
          <p>{application.moloch.name}</p>
        </Link>
        <ProfileHover address={application.applicantAddres}></ProfileHover>
      </div>
    );
  });

  return <div>{applicationList}</div>;
};

export default ApplicationShortList;
