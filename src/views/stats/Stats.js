import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

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

  return (
    <div className="View">
      <h1>DAOalytics</h1>
      {loading ? <p>Loading stats</p> : null}
      {error ? <p>Error</p> : null}
      {data ? (
        <div>
          <p className="Stat__title">Daos summoned</p>
          <p className="Stat__value">{totalDaos()}</p>
          <p className="Stat__title">Total Shares Held</p>
          <p className="Stat__value">{totalShares()}</p>
          <p className="Stat__title">Total Guild Bank Value</p>
          <p className="Stat__value">{totalGuildBank()}</p>
          <p className="Stat__title">Total Dao Members</p>
          <p className="Stat__value">tbd</p>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;
