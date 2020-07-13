import React from 'react';
// import { Line } from 'react-chartjs-2';

import './DaoCard.scss';

const DaoCard = ({ dao }) => {
  // console.log('dao', dao);
  // const data = {
  //   datasets: [
  //     {
  //       borderColor: '#0e99c4',
  //       backgroundColor: '#0e99c4',
  //       pointRadius: 0,
  //       lineTension: 0.9,
  //       data: dao.balances,
  //     },
  //   ],
  // };

  return (
    <>
      <div className="DaoCard">
        <h4 className="DaoName">{dao.title}</h4>
        <p>{dao.apiData.description}</p>

        <div className="Row">
          <div className="Column">
            <p className="Data">
              {dao.guildBankValue.usd.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}{' '}
            </p>

            <p className="Data">{dao.members.length} Members</p>
            <p className="Data">
              {dao.version === '2' ? dao.approvedTokens.length : '1'} Token(s)
            </p>
          </div>
        </div>

        {/* <div className="DaoCard__chart">
          <Line
            data={data}
            legend={{ display: false }}
            width={100}
            // height={50}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                    display: false,
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                    display: false,
                  },
                ],
              },
            }}
          />
        </div> */}
      </div>
    </>
  );
};

export default DaoCard;
