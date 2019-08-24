import React from "react";
import { Link } from 'react-router-dom';

const ApplicationList = (props) => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i}>
        <Link to={`dao/${application.molochContractAddress}`}>
          <p>{application.applicantAddress}</p>
          <p>{application.name}</p>
          <p>{application.bio}</p>
        </Link>
      </div>
    );
  })


  return (
    <>
      {applicationList}
    </>
  );
};

export default ApplicationList;
