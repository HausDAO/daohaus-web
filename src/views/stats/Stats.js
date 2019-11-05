import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import { GET_MOLOCHES_STATS } from '../../util/queries';

import './Stats.scss';
import GuildBanks from '../../components/stats/GuildBank';
import ProposalStats from '../../components/stats/ProposalStats';

const Stats = props => {
  const { loading, error, data } = useQuery(GET_MOLOCHES_STATS);

  console.log('data', data);

  const totalDaos = () => {
    return data.factories.length;
  };

  const totalShares = () => {
    return data.factories.reduce((sum, dao) => {
      return sum + +dao.totalShares;
    }, 0);
  };

  const totalDoaMemberships = () => {
    const counts = data.factories.reduce(
      (sum, dao) => {
        +dao.newContract
          ? (sum.new += dao.newContractMembers.length)
          : (sum.legacy += dao.apiDataStats.legacyData.members.length);
        return sum;
      },
      { new: 0, legacy: 0 },
    );

    return counts.new + counts.legacy;
  };

  const uniqueDaoMembers = () => {
    const memberIDs = _.flatMap(data.factories, dao => {
      return +dao.newContract
        ? dao.newContractMembers
        : dao.apiDataStats.legacyData.members;
    }).map(member => {
      return member.memberId ? member.memberId : member.id;
    });

    return _.uniq(memberIDs).length;
  };

  return (
    <div className="View Contain">
      <h1>BIG DAOta</h1>
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
          </div>

          <Tabs>
            <TabList>
              <Tab>Guild Banks</Tab>
              <Tab>Proposals and Votes</Tab>
            </TabList>

            <TabPanel>
              <GuildBanks data={data} />
            </TabPanel>
            <TabPanel>
              <ProposalStats data={data} />
            </TabPanel>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;
