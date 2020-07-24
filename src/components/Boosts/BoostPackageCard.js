import React from 'react';

import './Boosts.scss';

const BoostPackageCard = ({ boostPackage, isSummoning }) => {
  //todo: can toggle a link to detail or buy with isSummoning

  return (
    <div className="BoostPackageCard GridList__Item">
      <div className="Content">
        <h4>{boostPackage.name}</h4>
        <h2>{boostPackage.price}</h2>
        {boostPackage.features.map(boost => (
          <p key={boost}>{boost}</p>
        ))}
      </div>
    </div>
  );
};

export default BoostPackageCard;
