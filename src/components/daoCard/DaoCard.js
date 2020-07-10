import React, { useContext } from 'react';

import { Web3Context } from '../../contexts/ContractContexts';

import './DaoCard.scss';

const DaoCard = ({ dao }) => {
  const [web3Service] = useContext(Web3Context);

  const bankValue = value => {
    const amt = web3Service.web3Service.fromWei(value);
    return parseFloat(amt).toFixed(2);
  };

  return (
    <>
      <div className="DaoCard">
        <h4 className="DaoName">{dao.title}</h4>
        <p>{dao.apiData.description}</p>

        <div className="Row">
          <div className="Column">
            {dao.version !== '2' ? (
              <p className="Data">
                {bankValue(dao.guildBankValue.token)} {dao.depositToken.symbol}
              </p>
            ) : (
              <p className="Data">
                {dao.guildBankValue.token} **v2 value coming soon{' '}
              </p>
            )}
            <p className="Data">{dao.members.length} Members</p>
            <p className="Data">{dao.approvedTokens.length} Tokens</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaoCard;
