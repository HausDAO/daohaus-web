import React, { useContext, useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { Web3Context } from '../../contexts/ContractContexts';
import { getPrices } from '../../util/prices';
import { formatTotalUsd, toUsd } from '../../util/stat-helpers';

import '../../views/stats/Stats.scss';

const GuildBanks = ({ data }) => {
  const [web3Service] = useContext(Web3Context);
  const [prices, setPrices] = useState();
  const [barDaos, setBarDaos] = useState();

  useEffect(() => {
    setBarDaos(data.moloches.filter(dao => dao.version === '1'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const fetchPrices = async () => {
      const pricesRes = await getPrices();

      setPrices(pricesRes);
    };

    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  const barData = () => {
    const bgColors = barDaos.map(dao =>
      dao.id.replace('0x', '#').substring(0, 7),
    );

    let barData = {
      labels: [],
      datasets: [
        {
          label: 'Balance (USD)',
          backgroundColor: bgColors,
          hoverBackgroundColor: 'rgba(254, 92, 92,0.4)',
          data: [],
        },
      ],
    };
    barDaos.forEach(dao => {
      if (+dao.guildBankBalanceV1) {
        barData.labels.push(dao.title);
        const value = +web3Service.fromWei(dao.guildBankBalanceV1);
        const usd = toUsd(dao.depositToken.symbol.toLowerCase(), value, prices);
        barData.datasets[0].data.push(usd);
      }
    });

    return barData;
  };

  const totalGuildBank = () => {
    const value = barDaos.reduce(
      (sum, dao) => {
        sum[dao.depositToken.symbol.toLowerCase()] += +web3Service.fromWei(
          dao.guildBankBalanceV1,
        );
        return sum;
      },
      { weth: 0, dai: 0, plr: 0 },
    );

    return prices ? (
      <>
        <div className="Row">
          <div className="Column--33">
            <div className="Stat_group--Large">
              <p className="Label">Total Value (USD)</p>
              <p className="Value">{formatTotalUsd(value, prices)}</p>
            </div>
            <div className="Stat_group">
              <p className="Label">Total Eth</p>
              <p className="Value">
                {value.weth.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="Stat_group">
              <p className="Label">Total Dai</p>
              <p className="Value">
                {value.dai.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="Column--66">
            <h3>V1 Guild Bank Balances</h3>
            <div></div>

            <Doughnut data={barData(barDaos)} />
          </div>
        </div>
      </>
    ) : (
      <p>Loading stats</p>
    );
  };

  return <div>{barDaos ? <div>{totalGuildBank()}</div> : null}</div>;
};

export default GuildBanks;
