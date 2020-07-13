import React from 'react';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import '../../views/stats/Stats.scss';

const Activity = props => {
  const { data } = props;

  const lineData = () => {
    const groupedSummonData = _.groupBy(
      _.sortBy(data.moloches, 'summoningTime'),
      dao => {
        const date = new Date(+dao.summoningTime * 1000);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    );

    const groupedProposalData = _.groupBy(
      _.sortBy(
        _.flatMap(data.moloches, dao => {
          return dao.proposals;
        }),
        'createdAt',
      ),
      prop => {
        const date = new Date(+prop.createdAt * 1000);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    );

    let summonMonths = Object.keys(groupedSummonData);
    let propMonths = Object.keys(groupedProposalData);

    const startIndexProp =
      propMonths.indexOf('8/2019') === -1 ? 0 : propMonths.indexOf('8/2019');
    const startIndexSummon =
      summonMonths.indexOf('8/2019') === -1
        ? 0
        : summonMonths.indexOf('8/2019');

    propMonths = propMonths.slice(startIndexProp, propMonths.length - 1);
    summonMonths = summonMonths.slice(
      startIndexSummon,
      summonMonths.length - 1,
    );

    const labels =
      summonMonths.length > propMonths.length ? summonMonths : propMonths;

    const summonData = labels.map(label =>
      groupedSummonData[label] ? groupedSummonData[label].length : 0,
    );

    const propData = labels.map(label =>
      groupedProposalData[label] ? groupedProposalData[label].length : 0,
    );

    const voteData = labels.map(label => {
      return groupedProposalData[label]
        ? groupedProposalData[label].reduce(
            (voteSum, prop) => +voteSum + prop.votes.length,
            0,
          )
        : 0;
    });

    const groupedVoteData = _.groupBy(
      _.sortBy(
        _.flatMap(data.moloches, dao => {
          return dao.members;
        }),
        'createdAt',
      ),
      prop => {
        const date = new Date(+prop.createdAt * 1000);
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    );

    const memberData = labels.map(label =>
      groupedVoteData[label] ? groupedVoteData[label].length : 0,
    );

    let lineData = {
      labels,
      datasets: [
        {
          label: 'Summonings',
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
        {
          label: 'Votes',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(0,204,0,0.4)',
          borderColor: 'rgba(0,204,0,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(0,204,0,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(0,204,0,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: voteData,
        },
        {
          label: 'Memberships',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(255, 145, 0,0.4)',
          borderColor: 'rgba(255, 145, 0,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255, 145, 0,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255, 145, 0,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: memberData,
        },
      ],
    };

    return lineData;
  };

  return (
    <>
      <div className="Stat_overview">
        <Line data={lineData()} />

        <div className="GasBag">
          <Link to="/carbon-footprint">
            <span role="img" aria-label="gas">
              ⛽
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Activity;
