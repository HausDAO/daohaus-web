import React from 'react';
import { Link } from 'react-router-dom';
//import { useWeb3Context } from 'web3-react';
//import ActivateButton from '../activateButton/ActivateButton';

const SummonButton = () => {
  //const context = useWeb3Context();
  // if (!context.active) {
  //   return <ActivateButton msg={'Sign in to Summon a DAO'} />;
  // }
  return (
    <Link to={`summon`}>
      <button>Summon a DAO</button>
    </Link>
  );
};

export default SummonButton;
