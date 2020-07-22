import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import ActivateButton from '../activateButton/ActivateButton';
import { Web3Context } from '../../contexts/ContractContexts';

const ApplyButton = props => {
  const { contractAddress } = props;
  const [web3Context] = useContext(Web3Context);

  if (!web3Context.account) {
    return <ActivateButton msg={'Sign in to Pledge'} />;
  }
  return (
    <Link to={`/apply/${contractAddress}`}>
      <button>Pledge to Join</button>
    </Link>
  );
};

export default ApplyButton;
