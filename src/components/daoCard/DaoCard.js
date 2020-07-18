import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
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
        <div className="Title Row">
          <div
            className="DaoAvatar"
            style={{
              backgroundImage: `url("${makeBlockie(dao.id)}")`,
            }}
          ></div>
          <h4 className="DaoName">{dao.title}</h4>
        </div>
        <p className="DaoDesc">{dao.apiData.description}</p>

        <div className="Column">
          <p className="Data Bank">
            {dao.guildBankValue.usd.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
          </p>
          <div className="Info Row">
            <p className="Data">{dao.members.length} Members</p>
            <p className="Data">
              {dao.version === '2' ? dao.approvedTokens.length : '1'} Token(s)
            </p>
          </div>
          {/*}
          <div className="Actions Row">
            <div className="ButtonGroup">
              <button className="Outlined">View Page</button>
              <button>Enter the DAO</button>
            </div>
          </div>
          */}
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
