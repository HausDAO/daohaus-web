import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MEMBERDATA } from '../../util/queries';

import './DaoCard.scss';
import { Web3Context } from '../../contexts/ContractContexts';

const DaoCard = props => {
  const { dao } = props;
  const [web3Service] = useContext(Web3Context);

  const { loading, error, data } = useQuery(GET_MEMBERDATA, {
    variables: { contractAddr: dao.moloch },
  });

  const bankValue = value => {
    const amt = web3Service.fromWei(value);
    return parseFloat(amt).toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error - use mainnet :(</p>;

  console.log('dao', dao);

  return (
    <>
      {dao.id ? (
        <div className="DaoCard">
          <h4 className="DaoName">{dao.apiData.name || dao.title}</h4>
          <p>{dao.apiData.description}</p>
          <div className="Row">
            <div className="Column">
              {dao.version !== '2' ? (
                <>
                  <p className="Label">Bank</p>
                  <p className="Data">
                    {bankValue(dao.tokenInfo.guildBankValue)}{' '}
                    {dao.tokenInfo.symbol}
                  </p>
                </>
              ) : (
                <>
                  <p className="Label">Shares</p>
                  <p className="Data">{dao.metadata.totalShares}</p>
                </>
              )}
            </div>
            <div className="Column">
              <p className="Label">Members</p>
              {dao.version !== '2' ? (
                <p className="Data">
                  {dao.apiData.legacyData
                    ? dao.apiData.legacyData.members.length
                    : data.members.length}
                </p>
              ) : (
                <p className="Data">{dao.metadata.members.length}</p>
              )}
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
