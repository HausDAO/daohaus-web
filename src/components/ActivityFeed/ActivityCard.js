import React from 'react';

import './ActivityFeed.scss';

const ActivityCard = ({ activity }) => {
  return (
    <div className="ActivityCard">
      <div className="ActivityCard__avatar">
        <p>{activity.daoTitle.substr(0, 1)}</p>
      </div>
      <p>{activity.daoTitle}</p>

      {activity.proposalId ? (
        <>
          <p>proposal Type</p>
          <p>proposal Title</p>
          <p>proposal detail</p>
        </>
      ) : (
        <>
          <p>rage quit</p>
          <p>shares: {activity.shares}</p>
          <p>loot: {activity.loot}</p>
          <p>memberAddress: {activity.memberAddress}</p>
        </>
      )}
      <p></p>
    </div>
  );
};

export default ActivityCard;
