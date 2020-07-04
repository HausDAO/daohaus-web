import React from 'react';
import { Link } from 'react-router-dom';

const SummonButton = () => {
  return (
    <Link 
      className="Summon"
      to={`summon`}>
      <button>Summon</button>
    </Link>
  );
};

export default SummonButton;
