import React from "react";
import ApplicationWizard from "../../components/applicationForm/applicationWizard";

const Apply = (props) => {
  return (
    <>
      <ApplicationWizard contractAddress={props.match.params.contractAddress}></ApplicationWizard>
    </>
  );
};

export default Apply;
