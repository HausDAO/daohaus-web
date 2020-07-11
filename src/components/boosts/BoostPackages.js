import React from 'react';

import { boostPackages, otherBoosts } from '../../content/boost-content';
import BoostPackageCard from './BoostPackageCard';

import './Boosts.scss';

const BoostPackages = ({ isSummoning }) => {
  const renderBoostPackages = () => {
    return boostPackages.map(content => {
      return (
        <BoostPackageCard
          boostPackage={content}
          isSummoning={isSummoning}
          key={content.id}
        />
      );
    });
  };

  return (
    <div className="BoostPackages">
      <h3>Give your DAO a boost</h3>

      <div className="BoostPackages__list GridList">
        {renderBoostPackages()}
      </div>

      <div className="BoostPackages__custom">
        <div>
          <h2>Go Fully Custom</h2>
          <p>Cause You've got needs</p>
          <p>Coming soon</p>
          <h4>Other Boosts</h4>
          {otherBoosts.map(boost => {
            return <p key={boost}>+ {boost}</p>;
          })}
          <p>+ More Coming Soon...</p>
        </div>
        {/* <h3>some button</h3> */}
      </div>
    </div>
  );
};

export default BoostPackages;
