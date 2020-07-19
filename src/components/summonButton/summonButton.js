import React from 'react';
import { Link } from 'react-router-dom';

const SummonButton = () => {
  return (
    <Link className="Summon" to={`summon`}>
      <button className="Big">Summon</button>
    </Link>
  );
};

export default SummonButton;
