import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { Web3Context } from '../../contexts/ContractContexts';
import { getPrices } from '../../util/prices';
import { formatTotalUsd, toUsd } from '../../util/statHelpers';

import '../../views/stats/Stats.scss';

const GuildBanks = props => {
  const { data } = props;
  const [web3Service] = useContext(Web3Context);
  const [prices, setPrices] = useState();
  const [molochOn, setMolochOn] = useState(true);
  const [barDaos, setBarDaos] = useState(data.factories);

  console.log('data', data);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesRes = await getPrices();
      setPrices(pricesRes);
    };

    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  const barData = () => {
    let barData = {
      labels: [],
      datasets: [
        {
          label: 'Balance (USD)',
          backgroundColor: 'rgba(254, 92, 92, 1)',
          hoverBackgroundColor: 'rgba(254, 92, 92,0.4)',
          data: [],
        },
      ],
    };
    barDaos.forEach(dao => {
      if (+dao.guildBankValue) {
        barData.labels.push(dao.title);
        const value = +web3Service.fromWei(dao.guildBankValue);
        const usd = toUsd(dao.approvedToken, value, prices);
        barData.datasets[0].data.push(usd);
      }
    });

    return barData;
  };

  // const toggleMoloch = () => {
  //   setMolochOn(!molochOn);
  //   setBarDaos(barDaos.filter(dao => dao.title !== 'Moloch DAO'));
  // };

  const totalGuildBank = () => {
    const value = data.factories.reduce(
      (sum, dao) => {
        sum[dao.approvedToken] += +web3Service.fromWei(dao.guildBankValue);
        return sum;
      },
      { Weth: 0, Dai: 0 },
    );

    return prices ? (
      <>
        <div className="Stat_overview GuildBank_overview">
          <div className="Stat_group">
            <p className="Stat__title">Total Value (USD)</p>
            <p className="Stat__value">{formatTotalUsd(value, prices)}</p>
          </div>
          <div className="Stat_group">
            <p className="Stat__title">Total Eth</p>
            <p className="Stat__value">
              {value.Weth.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="Stat_group">
            <p className="Stat__title">Total Dai</p>
            <p className="Stat__value">
              {value.Dai.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div>
          <div>Guild Bank Balances</div>
          <div>
            {/* Click to toggle Moloch on and off
            <input
              type="checkbox"
              checked={molochOn}
              onChange={() => toggleMoloch()}
            /> */}
          </div>

          <Bar data={barData(data.factories)} />
        </div>
      </>
    ) : (
      <p>Loading stats</p>
    );
  };

  return <div>{data ? <div>{totalGuildBank()}</div> : null}</div>;
};

export default GuildBanks;