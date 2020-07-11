import React from 'react';

import './DaoCard.scss';

const DaoCard = ({ dao }) => {
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
      </div>
    </>
  );
};

export default DaoCard;
