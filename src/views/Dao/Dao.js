import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useApolloClient } from '@apollo/react-hooks';
import queryString from 'query-string';

import {
  Web3Context,
  MolochContext,
  TokenContext,
} from '../../contexts/ContractContexts';
import { get } from '../../util/requests';
import { GET_MOLOCH } from '../../util/queries';
import { successMessagesText } from '../../util/helpers';
import RageQuit from '../../components/RageQuit/RageQuit';
import UpdateDelegate from '../../components/UpdateDelegate/UpdateDelegate';
import MolochEmailSignup from '../../components/Shared/MolochEmailSignup/MolochEmailSignup';
import ApplicationList from '../../components/MemberList/ApplicationList';
import TokenService from '../../util/token-service';
import MolochService from '../../util/moloch-service';
import SignIn from '../../components/Shared/SignIn/SignIn';
import HeadTags from '../../components/Shared/HeadTags/HeadTags';

import './Dao.scss';

const Dao = props => {
  const client = useApolloClient();
  const [web3Context] = useContext(Web3Context);

  const [message, setMessage] = useState(null);
  const [daoData, setDaoData] = useState({});
  const [memberData, setMemberData] = useState();
  const [visitor, setVisitor] = useState({
    isMember: false,
    isApplicant: false,
  });
  const [updateDelegateView, setUpdateDelegateView] = useState(false);
  const [updateRageView, setUpdateRageView] = useState(false);
  const [emailSignupView, setEmailSignupView] = useState(false);
  const [molochService, setMolochService] = useContext(MolochContext);
  const [, setTokenService] = useContext(TokenContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const successMessage = successMessagesText(params.successMessage);
    setMessage(successMessage);
  }, [props.location.search]);

  useEffect(() => {
    getDao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Context]);

  useEffect(() => {
    setUpContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Context]);

  useEffect(() => {
    if (!_.isEmpty(daoData)) {
      getMembers(daoData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Context]);

  const closeMessage = () => {
    setMessage(null);
  };

  const setUpContract = async () => {
    if (web3Context && web3Context.web3Service) {
      const molochService = new MolochService(
        props.match.params.contractAddress,
        web3Context.web3Service,
      );
      await molochService.initContract();

      setMolochService(molochService);
    }
  };

  const getDao = async () => {
    const { isLoading, isError, data } = await client.query({
      query: GET_MOLOCH,
      variables: { contractAddr: props.match.params.contractAddress },
    });

    isLoading && setLoading(loading);
    isError && setError(error);

    if (data && web3Context && web3Context.web3Service) {
      if (!data.moloch) {
        const versionPath = props.location.pathname.split('/')[2];
        props.history.push(
          `/building-dao/${versionPath}/${props.match.params.contractAddress}`,
        );
        return false;
      }
      const tokenService = new TokenService(
        data.moloch.depositToken.tokenAddress,
        web3Context.web3Service,
      );
      await tokenService.initContract();

      setDaoData(data.moloch);
      setTokenService(tokenService);
      getMembers(data.moloch);
    }
  };

  const getMembers = async dao => {
    let members = { active: dao.members };

    const apiApplicants = await get(
      `moloch/${props.match.params.contractAddress}/applications`,
    );

    const memberAddresses = members.active.map(member => member.memberAddress);

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
      web3Context.account &&
      memberAddresses.includes(web3Context.account.toLowerCase());
    const applicantAddresses = members.applicants.map(app => {
      return app.applicantAddress.toLowerCase();
    });
    const isApplicant =
      web3Context.account &&
      applicantAddresses.includes(web3Context.account.toLowerCase());

    setVisitor({ isMember, isApplicant });
  };

  const bankValue = value => {
    const amt = web3Context.web3Service.fromWei(value);
    return parseFloat(amt).toFixed(2);
  };

  if (!molochService) {
    return <p>Loading the DAO</p>;
  }

  return (
    <div>
      {daoData.id ? <HeadTags daoData={daoData} /> : null}

      {loading ? <p>Loading the DAO</p> : null}
      {error ? <p>Sorry there's been an error</p> : null}

      {updateDelegateView && molochService ? (
        <UpdateDelegate
          contract={molochService.contract}
          contractAddress={daoData.id}
          setComplete={setUpdateDelegateView}
        />
      ) : updateRageView && molochService ? (
        <RageQuit
          contract={molochService.contract}
          contractAddress={daoData.id}
          setComplete={setUpdateRageView}
          memberData={memberData}
          account={web3Context.account.toLowerCase()}
        />
      ) : emailSignupView && molochService ? (
        <div className="View__EmailSignup">
          <button onClick={() => setEmailSignupView(false)}>{'<= '}Back</button>
          <MolochEmailSignup />
        </div>
      ) : (
        <>
          {daoData.id ? (
            <>
              {message ? (
                <div className="SuccessMessage Flash">
                  <p>{message}</p>
                  <div className="CloseFlash" onClick={() => closeMessage()}>
                    x
                  </div>
                </div>
              ) : null}
              <div className="Hero DaoInfo">
                <div className="Contents">
                  <div className="Basics">
                    <h1 className="DaoName">{daoData.apiData.name}</h1>
                    <p className="Description">{daoData.apiData.description}</p>
                    {daoData.apiData.daoUrl && (
                      <a
                        className="small"
                        href={daoData.apiData.daoUrl}
                        alt="link to dao site"
                      >
                        {daoData.apiData.daoUrl}
                      </a>
                    )}
                    <div className="Dao__actions">
                      <h4 className="Label">Things to DAO</h4>
                      {molochService.contractAddr ===
                        '0x1fd169a4f5c59acf79d0fd5d91d1201ef1bce9f1' && (
                        <button onClick={() => setEmailSignupView(true)}>
                          Get Email Updates
                        </button>
                      )}
                      {web3Context.account ? (
                        <>
                          {visitor.isMember ? (
                            <>
                              <p>Hello Member!</p>
                              <button
                                onClick={() => setUpdateDelegateView(true)}
                              >
                                Update Delegate
                              </button>
                              <br />
                              <button onClick={() => setUpdateRageView(true)}>
                                Rage Quit
                              </button>
                            </>
                          ) : (
                            <>
                              {visitor.isApplicant ? (
                                <>
                                  <p>Hello Applicant!</p>
                                  <p>
                                    If/when you become a Member, you'll see
                                    Member functions here.
                                  </p>
                                </>
                              ) : (
                                <>
                                  <Link
                                    to={`/apply/${molochService.contractAddr}`}
                                  >
                                    <button>Pledge to Join</button>
                                  </Link>
                                </>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <p>You need to sign in with Ethereum first</p>
                          <SignIn msg={'Sign in'} />
                        </>
                      )}
                      {!daoData.apiData.hidePokemol &&
                      process.env.REACT_APP_NETWORK_ID !== '100' ? (
                        <div className="Dapp">
                          <a
                            className="Button Medium"
                            href={`${process.env.REACT_APP_POKEMOL_URL}/dao/${molochService.contractAddr}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            Enter the DAO
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="Dao">
                    <div className="Details">
                      <h4>Dao Details</h4>
                      <p className="Label">Bank</p>
                      <p className="Value Data">
                        {bankValue(daoData.guildBankBalanceV1)}{' '}
                        {daoData.depositToken.symbol}
                      </p>
                      <p className="Label">Members</p>
                      <p className="Value Data">
                        {memberData && memberData.active.length}
                      </p>
                      <p className="Label">Minimum Tribute</p>
                      <p className="Value Data">
                        {daoData.apiData.minimumTribute}{' '}
                        {daoData.depositToken.symbol}
                      </p>
                      <p className="Label">Total Shares</p>
                      <p className="Value Data">{daoData.totalShares}</p>
                      <p className="Label">
                        DAO Contract Address (Do NOT send funds here)
                      </p>
                      <p className="Value Data">
                        <a
                          href={
                            'https://etherscan.io/address/' +
                            molochService.contractAddr
                          }
                          rel="noopener noreferrer"
                        >
                          {molochService.contractAddr}
                        </a>
                      </p>
                      <p className="Label">Guild Bank</p>
                      <p className="Value Data">
                        <a
                          href={
                            'https://etherscan.io/address/' +
                            daoData.guildBankAddress
                          }
                          rel="noopener noreferrer"
                        >
                          {daoData.guildBankAddress}
                        </a>
                      </p>
                      <p className="Label">Summoner</p>
                      <p className="Value Data">
                        <a
                          href={
                            'https://etherscan.io/address/' + daoData.summoner
                          }
                          rel="noopener noreferrer"
                        >
                          {daoData.summoner}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {memberData && molochService ? (
            <div className="View">
              <ApplicationList
                members={memberData}
                daoData={daoData}
                contract={molochService.contract}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Dao;
