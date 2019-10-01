import React, { useState, useEffect, useContext } from 'react';
import { useWeb3Context } from 'web3-react';
import { useApolloClient } from '@apollo/react-hooks';

import ApplyButton from '../../components/applyButton/applyButton';
import RageQuit from '../../components/rageQuit/RageQuit';
import UpdateDelegate from '../../components/updatedDelegate/UpdateDelegate';
import ApplicationList from '../../components/applicationList/ApplicationList';

import { Web3Context, MolochContext } from '../../contexts/ContractContexts';
import DaoAbi from '../../contracts/moloch';
import { get } from '../../util/requests';
import { GET_MEMBERDATA, GET_MOLOCH } from '../../util/queries';

import './Dao.scss';

const Dao = props => {
  const context = useWeb3Context();
  const client = useApolloClient();
  const [web3Service] = useContext(Web3Context);

  const [daoData, setDaoData] = useState({});
  const [memberData, setMemberData] = useState();
  const [isMemberOrApplicant, setIsMemberOrApplicant] = useState(false);
  const [updateDelegateView, setUpdateDelegateView] = useState(false);
  const [updateRageView, setUpdateRageView] = useState(false);
  const [molochContract, setMolochContract] = useContext(MolochContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUpContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  const setUpContract = async () => {
    if (web3Service) {
      const contract = await web3Service.initContract(
        DaoAbi,
        props.match.params.contractAddress,
      );
      setMolochContract(contract);
    }
  };

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
      return !memberAddresses.includes(
        applicant.applicantAddress.toLowerCase(),
      );
    });

    const isMember =
      context.active && memberAddresses.includes(context.account.toLowerCase());
    const applicantAddresses = members.applicants.map(app => {
      return app.applicantAddress.toLowerCase();
    });
    const isApplicant =
      context.active &&
      applicantAddresses.includes(context.account.toLowerCase());

    setIsMemberOrApplicant(isMember || isApplicant);
    setMemberData(members);
  };

  return (
    <div className="View">
      {loading ? <p>THE HAUS IS LOADING THE DAO</p> : null}
      {error ? <p>Error</p> : null}

      {updateDelegateView ? (
        <UpdateDelegate contract={molochContract} />
      ) : updateRageView ? (
        <RageQuit contract={molochContract} />
      ) : (
        <>
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
          {isMemberOrApplicant ? (
            <>
              <p>You are a member or applicant.</p>
              <button onClick={() => setUpdateDelegateView(true)}>
                Update Delegate
              </button>
              <br />
              <button onClick={() => setUpdateRageView(true)}>Rage Quit</button>
            </>
          ) : (
            <>{<ApplyButton contractAddress={daoData.id} />}</>
          )}

          {memberData ? (
            <ApplicationList
              members={memberData}
              daoData={daoData}
              contract={molochContract}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Dao;
