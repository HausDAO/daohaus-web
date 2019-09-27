import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MEMBERDATA } from '../../util/queries';

import './DaoCard.scss';

const DaoCard = props => {
  const { dao } = props;

  const { loading, error, data } = useQuery(GET_MEMBERDATA, {
    variables: { contractAddr: dao.moloch },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //TODO: Memebers will comback as 0 if legacy. Need to figure out api hydration from here.

  return (
    <>
      {dao.id ? (
        <div className="DaoCard">
          <h4 className="DaoName">{dao.apiData.name}</h4>
          <p>{dao.apiData.description}</p>
          <div className="Row">
            <div className="Column">
              <p className="Label">Bank</p>
              <p className="Data">
                {dao.guildBankValue} {dao.approvedToken}
              </p>
            </div>
            <div className="Column">
              <p className="Label">Members</p>
              <p className="Data">{data.members.length}</p>
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
