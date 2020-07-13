import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { GET_MOLOCHES_STATS } from '../../util/queries';
import Activity from '../../components/stats/Activity';
// import GuildBanks from '../../components/stats/GuildBank';

import './Stats.scss';

const Stats = () => {
  const [fetching, setFetching] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(GET_MOLOCHES_STATS);

  if (loading) return <p className="View">Loading DAOs</p>;
  if (error) return <p className="View">Sorry there's been an error</p>;

  fetchMore({
    variables: { skip: data.moloches.length },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (fetchMoreResult.moloches.length === 0) {
        setFetching(false);
        return prev;
      }

      return Object.assign({}, prev, {
        moloches: [...prev.moloches, ...fetchMoreResult.moloches],
      });
    },
  });

  const totalDaos = () => {
    return data.moloches.length;
  };

  const totalShares = () => {
    return data.moloches.reduce((sum, dao) => {
      return sum + +dao.totalShares;
    }, 0);
  };

  const totalDoaMemberships = () => {
    return data.moloches.reduce((sum, dao) => {
      return sum + +dao.members.length;
    }, 0);
  };

  const uniqueDaoMembers = () => {
    const memberIds = _.flatMap(data.moloches, dao => {
      return dao.members;
    }).map(member => member.memberAddress);

    return _.uniq(memberIds).length;
  };

  const totalProposals = () => {
    return data.moloches.reduce((sum, dao) => {
      return sum + +dao.proposals.length;
    }, 0);
  };

  const totalVotes = () => {
    return _.flatMap(data.moloches, dao => {
      return _.flatMap(dao.proposals, prop => prop.votes);
    }).length;
  };

  return (
    <div className="View Contain">
      <h1>
        BIG DAOta{' '}
        <span role="img" aria-label="chart">
          📈
        </span>
      </h1>
      {data && !fetching ? (
        <div>
          <div className="Stat_overview">
            <div className="Stat_group">
              <p className="Stat__title">Daos summoned</p>
              <p className="Stat__value">{totalDaos()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Total Dao Memberships</p>
              <p className="Stat__value">{totalDoaMemberships()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Unique Dao Members</p>
              <p className="Stat__value">{uniqueDaoMembers()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Total Proposals</p>
              <p className="Stat__value">{totalProposals()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Total Votes</p>
              <p className="Stat__value">{totalVotes()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Total Shares Held</p>
              <p className="Stat__value">{totalShares()}</p>
            </div>
          </div>

          <Tabs>
            <TabList>
              <Tab>Activity</Tab>
              {/* <Tab>V1 Guild Banks</Tab> */}
            </TabList>
            <TabPanel>
              <Activity data={data} />
            </TabPanel>
            {/* <TabPanel>
              <GuildBanks data={data} />
            </TabPanel> */}
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;
