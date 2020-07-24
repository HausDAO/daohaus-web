import React from 'react';
import { Link } from 'react-router-dom';

const SummonButton = () => {
  return (
    <Link className="Button Big Summon" to={`summon`}>
      Summon
    </Link>
  );
};

export default SummonButton;
