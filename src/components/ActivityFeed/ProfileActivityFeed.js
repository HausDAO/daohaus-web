import React, { useState, useEffect } from 'react';

import ActivityFeed from './ActivityFeed';

import './ActivityFeed.scss';

const ProfileActivityFeed = ({ daos }) => {
  const [unread, setUnread] = useState();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let proposalActivities = [];
    let unreadProposals = [];
    let rageActivities = [];

    daos.forEach(dao => {
      const activeProps = dao.proposals.filter(prop => {
        return prop.unread;
      });
      unreadProposals = [...unreadProposals, ...activeProps];

      proposalActivities = [
        ...proposalActivities,
        ...activeProps.map(proposal => {
          return { ...proposal, daoTitle: dao.title };
        }),
      ];

      rageActivities = [
        ...rageActivities,
        ...dao.rageQuits.map(rage => {
          return { ...rage, daoTitle: dao.title };
        }),
      ];
    });

    setActivities(
      [...proposalActivities, ...rageActivities].sort(
        (a, b) => +b.createdAt - +a.createdAt,
      ),
    );
    setUnread(unreadProposals.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ProfileActivityFeed">
      <div className="ProfileActivityFeed__header">
        <h4>Activity Feed</h4>

        <p>{unread} Unread</p>
      </div>
      <ActivityFeed activities={activities} />
    </div>
  );
};

export default ProfileActivityFeed;
