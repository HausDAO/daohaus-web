import React, { useState, useEffect, useContext } from 'react';
import { useWeb3Context } from 'web3-react';
// import { Query } from 'react-apollo';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

// import ApplicationList from '../../components/applicationList/ApplicationList';
// import ApplyButton from '../../components/applyButton/applyButton';
// import UpdateDelegate from '../../components/updatedDelegate/UpdateDelegate';
// import RageQuit from '../../components/rageQuit/RageQuit';
// import DaoAbi from '../../contracts/moloch';
// import { Web3Context, MolochContext } from '../../contexts/ContractContexts';
// import { get } from '../../util/requests';
// import { addressToToken } from '../../util/constants';
// import { legacyGraph } from '../../util/legacyGraphService';
import {
  // GET_MEMBERDATA,
  // GET_MEMBERDATA_LEGACY,
  GET_MOLOCH,
} from '../../util/queries';

import './Dao.scss';

const Dao = props => {
  // const context = useWeb3Context();
  const [daoData, setDaoData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    getDao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDao = async () => {
    const { isLoading, isError, data } = await client.query({
      query: GET_MOLOCH,
      variables: { contractAddr: props.match.params.contractAddress },
    });

    isLoading && setLoading(loading);
    isError && setError(error);
    data && setDaoData(data.factories[0]);
  };
  // const { loading, error, data } = useQuery(GET_MOLOCH, {
  //   variables: { contractAddr: props.match.params.contractAddress },
  // });
  // const daoData = data ? data.factories[0] : null;
  // console.log(daoData);

  console.log('loading', loading);
  console.log('error', error);
  console.log('daoData', daoData);

  return (
    <div className="View">
      {loading ? <p>THE HAUS IS LOADING THE DAO</p> : null}
      {error ? <p>Error</p> : null}
      {daoData.id ? (
        <div>
          <h2 className="DaoName">{daoData.apiData.name}</h2>
          <p className="Large">{daoData.apiData.description}</p>
          {daoData.apiData.daoUrl && (
            <a
              className="small"
              href={daoData.apiData.daoUrl}
              alt="link to dao site"
            >
              {daoData.apiData.daoUrl}
            </a>
          )}
          <p className="Label">Shares</p>
          <p className="Value Data">{daoData.totalShares}</p>
          <p className="Label">Summoner</p>
          <p className="Value Data">{daoData.summonerAddress}</p>
          <p className="Label">Minimum Tribute</p>
          <p className="Value Data">
            {daoData.apiData.minimumTribute} {daoData.approvedToken}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Dao;
