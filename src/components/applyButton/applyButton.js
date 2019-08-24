import React from "react";
import { Link } from 'react-router-dom';

const ApplyButton = (props) => {
  const {contractAddress} = props;

  return (
      <Link to={`/apply/${contractAddress}`}> 
        <button>Apply to be a member</button>
      </Link>
  );
};

export default ApplyButton;
