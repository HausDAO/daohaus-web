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
      {dao.id ? (
        <div className="DaoCard">
          <h4 className="DaoName">{dao.apiData.name || dao.title}</h4>
          <p>{dao.apiData.description}</p>
          <p>Moloch Version {dao.version}</p>

          <div className="Row">
            <div className="Column">
              <>
                <p className="Label">Shares</p>
                <p className="Data">{dao.totalShares}</p>
              </>
              {dao.version !== '2' ? (
                <>
                  <p className="Label">Bank Value</p>
                  <p className="Data">
                    {bankValue(dao.guildBankValue)} {dao.depositToken.symbol}
                  </p>
                </>
              ) : (
                <>
                  <p className="Label">Bank Tokens</p>
                  <p className="Data">{dao.approvedTokens.length}</p>
                </>
              )}
            </div>
            <div className="Column">
              <p className="Label">Members</p>
              <p className="Data">{dao.members.length}</p>

              <p className="Label">Proposals</p>
              <p className="Data">{`${dao.proposals.length} ${
                dao.proposals.length >= 100 ? '+' : ''
              }`}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>LOADING THE DAOs</p>
      )}
    </>
  );
};

export default DaoCard;
