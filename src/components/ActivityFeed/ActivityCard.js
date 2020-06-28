import React from 'react';

import './ActivityFeed.scss';

const ActivityCard = ({ activity }) => {
  const baseUrl = `${process.env.REACT_APP_POKEMOL_URL}/dao/${activity.molochAddress}`;
  const url = activity.proposalId
    ? `${baseUrl}/proposal/${
        activity.molochvVersion === 2
          ? activity.proposalId
          : activity.proposalIndex
      }`
    : `${baseUrl}`;

  return (
    <div className="ActivityCard">
      <a href={url}>
        <div className="ActivityCard__avatar">
          <p>{activity.daoTitle.substr(0, 1)}</p>
        </div>
        <p>{activity.daoTitle}</p>

        {activity.proposalId ? (
          <>
            <p>{activity.proposalType}</p>
            <p>{activity.title}</p>
            <p>{activity.description}</p>
          </>
        ) : (
          <>
            <p>Rage Quit</p>
            <p>shares: {activity.shares}</p>
            <p>loot: {activity.loot}</p>
            <p>memberAddress: {activity.memberAddress}</p>
          </>
        )}
        <p></p>
      </a>
    </div>
  );
};

export default ActivityCard;
