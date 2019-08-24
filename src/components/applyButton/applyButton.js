import React from "react";
import { Link } from 'react-router-dom';

const ApplyButton = (props) => {
  const {contractAddress} = props;

  return (
      <Link to={`/apply/${contractAddress}`}> 
        <button>Pledge to Join</button>
      </Link>
  );
};

export default ApplyButton;
