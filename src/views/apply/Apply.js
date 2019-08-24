import React from "react";
import ApplicationForm from "../../components/applicationForm/applicationForm";

const Apply = (props) => {
  return (
    <>
      <ApplicationForm contractAddress={props.match.params.contractAddress}></ApplicationForm>
    </>
  );
};

export default Apply;
