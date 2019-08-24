import React from "react";
import { Link } from 'react-router-dom';

const ApplicationList = (props) => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i}>
        <Link to={`dao/${application.molochContractAddress}`}>
          <p>{application.moloch.name}</p>
        </Link>
      </div>
    );
  })


  return (
    <div>
      {applicationList}
    </div>
    
  );
};

export default ApplicationList;
