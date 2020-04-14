import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { GET_MOLOCHES_STATS } from '../../util/queries';

import './Stats.scss';
// import GuildBanks from '../../components/stats/GuildBank';
import Activity from '../../components/stats/Activity';

const Stats = props => {
  const { loading, error, data } = useQuery(GET_MOLOCHES_STATS);

  console.log('stats', data);

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
      <h1>BIG DAOta</h1>

      <h2>
        {' '}
        <span role="img" aria-label="construction">
          ⚒️
        </span>
        Under construction{' '}
        <span role="img" aria-label="construction">
          ⚒️
        </span>
      </h2>
      {loading ? <p>Loading stats</p> : null}
      {error ? <p>Error - are you on mainnet?</p> : null}
      {data ? (
        <div>
          <div className="Stat_overview">
            <div className="Stat_group">
              <p className="Stat__title">Daos summoned</p>
              <p className="Stat__value">{totalDaos()}</p>
            </div>
            <div className="Stat_group">
              <p className="Stat__title">Total Shares Held</p>
              <p className="Stat__value">{totalShares()}</p>
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
          </div>

          <Tabs>
            <TabList>
              <Tab>Activity</Tab>
              <Tab>Guild Banks</Tab>
            </TabList>

            <TabPanel>
              <Activity data={data} />
            </TabPanel>
            <TabPanel>{/* <GuildBanks data={data} /> */}</TabPanel>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;
