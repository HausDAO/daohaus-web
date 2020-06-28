import React from 'react';

import ActivityCard from './ActivityCard';

import './ActivityFeed.scss';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="ActivityFeed">
      {activities.map(activity => (
        <ActivityCard activity={activity} key={activity.id} />
      ))}
    </div>
  );
};

export default ActivityFeed;
