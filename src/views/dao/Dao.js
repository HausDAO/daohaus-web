import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { useWeb3Context } from 'web3-react';
import { useApolloClient } from '@apollo/react-hooks';

import ApplyButton from '../../components/applyButton/applyButton';
import RageQuit from '../../components/rageQuit/RageQuit';
import UpdateDelegate from '../../components/updatedDelegate/UpdateDelegate';
import ApplicationList from '../../components/applicationList/ApplicationList';

import {
  Web3Context,
  MolochContext,
  TokenContext,
} from '../../contexts/ContractContexts';
import DaoAbi from '../../contracts/moloch';
import TokenAbi from '../../contracts/erc20';
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
  const [, setTokenContract] = useContext(TokenContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  useEffect(() => {
    setUpContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  useEffect(() => {
    if (!_.isEmpty(daoData)) {
      getMembers(daoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

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

    if (data && web3Service) {
      const tokenContract = await web3Service.initContract(
        TokenAbi,
        data.factories[0].tokenInfo.address,
      );

      setDaoData(data.factories[0]);
      setTokenContract(tokenContract);
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

    checkIfMemberOrApplicant(memberAddresses, members);
    setMemberData(members);
  };

  const checkIfMemberOrApplicant = (memberAddresses, members) => {
    const isMember =
      context.active && memberAddresses.includes(context.account.toLowerCase());
    const applicantAddresses = members.applicants.map(app => {
      return app.applicantAddress.toLowerCase();
    });
    const isApplicant =
      context.active &&
      applicantAddresses.includes(context.account.toLowerCase());

    setIsMemberOrApplicant(isMember || isApplicant);
  };

  return (
    <div className="View">
      {loading ? <p>THE HAUS IS LOADING THE DAO</p> : null}
      {error ? <p>Error - are you on mainnet?</p> : null}

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
                {daoData.apiData.minimumTribute} {daoData.tokenInfo.symbol}
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
