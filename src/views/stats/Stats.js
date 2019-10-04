import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import { GET_MOLOCHES_STATS } from '../../util/queries';
import { Web3Context } from '../../contexts/ContractContexts';

import './Stats.scss';

const Stats = props => {
  const { loading, error, data } = useQuery(GET_MOLOCHES_STATS);
  const [web3Service] = useContext(Web3Context);

  console.log('data', data);

  const totalDaos = () => {
    return data.factories.length;
  };

  const totalGuildBank = () => {
    const value = data.factories.reduce(
      (sum, dao) => {
        sum[dao.approvedToken] += +web3Service.fromWei(dao.guildBankValue);
        return sum;
      },
      { Weth: 0, Dai: 0 },
    );

    return (
      <span>
        {value.Weth} Weth / {value.Dai} Dai
      </span>
    );
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
          : (sum.legacy += dao.apiData.legacyData.members.length);
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
        : dao.apiData.legacyData.members;
    }).map(member => {
      return member.memberId ? member.memberId : member.id;
    });

    return _.uniq(memberIDs).length;
  };

  return (
    <div className="View">
      <h1>DAOalytics</h1>
      {loading ? <p>Loading stats</p> : null}
      {error ? <p>Error - are you on mainnet?</p> : null}
      {data ? (
        <div>
          <p className="Stat__title">Daos summoned</p>
          <p className="Stat__value">{totalDaos()}</p>
          <p className="Stat__title">Total Shares Held</p>
          <p className="Stat__value">{totalShares()}</p>
          <p className="Stat__title">Total Guild Bank Value</p>
          <p className="Stat__value">{totalGuildBank()}</p>
          <p className="Stat__title">Total Dao Memberships</p>
          <p className="Stat__value">{totalDoaMemberships()}</p>
          <p className="Stat__title">Unique Dao Members</p>
          <p className="Stat__value">{uniqueDaoMembers()}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;
