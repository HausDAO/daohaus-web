import React from 'react';
import { Link } from 'react-router-dom';

const SummonButton = () => {
  return (
    <Link to={`summon`}>
      <button>Summon a DAO</button>
    </Link>
  );
};

export default SummonButton;
