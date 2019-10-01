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
// import { addressToToken } from '../../util/constants';
// import { legacyGraph } from '../../util/legacyGraphService';
import { get } from '../../util/requests';
import { GET_MEMBERDATA, GET_MOLOCH } from '../../util/queries';

import './Dao.scss';

const Dao = props => {
  // const context = useWeb3Context();
  const [daoData, setDaoData] = useState({});
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMemberOrApplicant, setIsMemberOrApplicant] = useState(false);
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

    if (data) {
      setDaoData(data.factories[0]);
      getMembers(data.factories[0]);
    }
  };

  const getMembers = async dao => {
    let members = {};

    if (+dao.newContract) {
      const { data } = await client.query({
        query: GET_MEMBERDATA,
        variables: { contractAddr: props.match.params.contractAddress },
      });

      if (data) {
        members.active = data.members;
      }
    } else {
      members.active = dao.apiData.legacyData.members;
    }

    const apiApplicants = await get(
      `moloch/${props.match.params.contractAddress}/applications`,
    );

    const memberAddresses = members.active.map(member => {
      return +dao.newContract ? member.memberId : member.id;
    });
    members.applicants = apiApplicants.data.filter(applicant => {
      return !memberAddresses.includes(applicant.applicantAddress);
    });

    setMemberData(members);
  };

  console.log('loading', loading);
  console.log('error', error);
  console.log('daoData', daoData);
  console.log('memberData', memberData);

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
          <p className="Value Data">{daoData.summoner}</p>
          <p className="Label">Minimum Tribute</p>
          <p className="Value Data">
            {daoData.apiData.minimumTribute} {daoData.approvedToken}
          </p>
        </div>
      ) : null}
      {/* {isMemberOrApplicant ? (
        <>
          <p>You are a member or applicant.</p>
          <button onClick={() => setUpdateDelegateView(true)}>
            Update Delegate{' '}
          </button>
          <br />
          <button onClick={() => setUpdateRageView(true)}>Rage Quit </button>
        </>
      ) : (
        <>
          <ApplyButton contractAddress={daoData.contractAddress} />
        </>
      )}{' '} */}
    </div>
  );
};

export default Dao;
