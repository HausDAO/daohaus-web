import React from 'react';

import './Boosts.scss';

const BoostPackageCard = ({ boostPackage, isSummoning }) => {
  //todo: can toggle a link to detail or buy with isSummoning

  return (
    <div className="BoostPackageCard GridList__Item">
      <div className="Content">
        <h4>{boostPackage.packageName}</h4>
        <h2>{boostPackage.packageCost}</h2>
        {boostPackage.boosts.map(boost => (
          <p key={boost}>{boost}</p>
        ))}
      </div>
    </div>
  );
};

export default BoostPackageCard;
