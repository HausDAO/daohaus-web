import React from 'react';
import ApplicationWizard from '../../components/applicationForm/applicationWizard';

const Apply = props => {
  return (
    <div className="View">
      <ApplicationWizard
        contractAddress={props.match.params.contractAddress}
      ></ApplicationWizard>
    </div>
  );
};

export default Apply;
