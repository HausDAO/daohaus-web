import React from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';

import '../../views/stats/Stats.scss';

const Activity = props => {
  const { data } = props;

  const lineData = () => {
    const groupedSummonData = _.groupBy(
      _.sortBy(data.factories, 'createdAt'),
      dao => {
        const date = new Date(+dao.createdAt * 1000);

        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    );

    const allProposals = _.sortBy(
      _.flatMap(data.factories, dao => {
        return +dao.newContract
          ? dao.newContractProposals
          : dao.apiDataStats.legacyData.proposals;
      }),
      'timestamp',
    );

    const groupedProposalData = _.groupBy(allProposals, prop => {
      const date = new Date(+prop.timestamp * 1000);

      return `${date.getMonth() + 1}/${date.getFullYear()}`;
    });

    const summonMonths = Object.keys(groupedSummonData);
    const propMonths = Object.keys(groupedProposalData);

    const labels =
      summonMonths.length > propMonths.length ? summonMonths : propMonths;

    const summonData = labels.map(label =>
      groupedSummonData[label] ? groupedSummonData[label].length : 0,
    );

    const propData = labels.map(label =>
      groupedProposalData[label] ? groupedProposalData[label].length : 0,
    );

    let lineData = {
      labels,
      datasets: [
        {
          label: 'Daos Summoned',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: summonData,
        },
        {
          label: 'Proposals',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(247,74,74,0.4)',
          borderColor: 'rgba(247,74,74,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(247,74,74,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(247,74,74,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: propData,
        },
      ],
    };

    return lineData;
  };

  return (
    <>
      <div className="Stat_overview">
        <Line data={lineData()} />
      </div>
    </>
  );
};

export default Activity;
