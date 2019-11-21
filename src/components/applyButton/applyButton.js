import React from 'react';
import { Link } from 'react-router-dom';
import ActivateButton from '../activateButton/ActivateButton';
import { useWeb3Context } from 'web3-react';

const ApplyButton = props => {
  const { contractAddress } = props;
  const context = useWeb3Context();

  if (!context.active) {
    return <ActivateButton msg={'Sign in to Pledge'} />;
  }
  return (
    <Link to={`/apply/${contractAddress}`}>
      <button>Pledge to Join</button>
    </Link>
  );
};

export default ApplyButton;
