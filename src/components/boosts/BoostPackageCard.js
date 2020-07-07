import React from 'react';

import './Boosts.scss';

const BoostPackageCard = ({ boostPackage, isSummoning }) => {
  //todo: can toggle a link to detail or buy with isSummoning

  return (
    <div className="BoostPackageCard">
      <h2>{boostPackage.packageName}</h2>
      <h1>{boostPackage.packageCost}</h1>
      {boostPackage.boosts.map(boost => (
        <p key={boost}>{boost}</p>
      ))}
    </div>
  );
};

export default BoostPackageCard;
