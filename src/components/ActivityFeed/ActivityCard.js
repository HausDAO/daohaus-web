import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

import './ActivityFeed.scss';
import { formatCreatedAt } from '../../util/helpers';

const ActivityCard = ({ activity }) => {
  const baseUrl = `${process.env.REACT_APP_POKEMOL_URL}/dao/${activity.molochAddress}`;
  const url = activity.proposalId
    ? `${baseUrl}/proposal/${
        activity.molochVersion === '2'
          ? activity.proposalId
          : activity.proposalIndex
      }`
    : `${baseUrl}`;

  return (
    <div className="ActivityCard">
      <a href={url}>
        <div className="Daolist__Header">
          <div
            className="Daolist__Avatar"
            style={{
              backgroundImage: `url("${makeBlockie(activity.molochAddress)}")`,
            }}
          >
            <p className="Daolist__Avatar--Initial">
              {activity.daoTitle.substr(0, 1)}
            </p>
          </div>
          <p>{activity.daoTitle}</p>
        </div>

        {activity.proposalId ? (
          <>
            <h6>{`${activity.activityFeed.message} ${activity.proposalType}`}</h6>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </>
        ) : (
          <>
            <h6>Rage Quit on {formatCreatedAt(activity.createdAt)}</h6>
            <p>Shares: {activity.shares}</p>
            <p>Loot: {activity.loot}</p>
            <p>memberAddress: {activity.memberAddress}</p>
          </>
        )}
        <p></p>
      </a>
    </div>
  );
};

export default ActivityCard;
