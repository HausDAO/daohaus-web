import React from 'react';
import { Link } from 'react-router-dom';

import './ApplicationList.scss';

const ApplicationMolochList = props => {
  const { applications } = props;

  const applicationList = applications.map((application, i) => {
    return (
      <div key={i} className="Applicant__List">
        <Link
          className="List--Item"
          to={`/dao/v1/${application.molochContractAddress.toLowerCase()}`}
        >
          {application.moloch.name}
        </Link>
      </div>
    );
  });

  return <div>{applicationList}</div>;
};

export default ApplicationMolochList;
