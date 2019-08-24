import React from "react";
// import ApplicationForm from "../../components/applicationForm/applicationForm";
import ApplicationWizard from "../../components/applicationForm/applicationWizard";

const Apply = (props) => {
  return (
    <>
      {/* <ApplicationForm contractAddress={props.match.params.contractAddress}></ApplicationForm> */}
      <ApplicationWizard contractAddress={props.match.params.contractAddress}></ApplicationWizard>
    </>
  );
};

export default Apply;
