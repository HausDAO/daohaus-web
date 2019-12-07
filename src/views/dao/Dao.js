import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useWeb3Context } from 'web3-react';
import { useApolloClient } from '@apollo/react-hooks';
import queryString from 'query-string';

import PokemolBrand from '../../assets/pokemol__brand--standard-white.svg';

// import ApplyButton from '../../components/applyButton/applyButton';

import RageQuit from '../../components/rageQuit/RageQuit';
import UpdateDelegate from '../../components/updatedDelegate/UpdateDelegate';
import ApplicationList from '../../components/applicationList/ApplicationList';

import {
  Web3Context,
  MolochContext,
  TokenContext,
} from '../../contexts/ContractContexts';

import { get } from '../../util/requests';
import { GET_MEMBERDATA, GET_MOLOCH } from '../../util/queries';
import { successMessagesText } from '../../util/helpers';
import TokenService from '../../util/tokenService';
import MolochService from '../../util/molochService';
import ActivateButton from '../../components/activateButton/ActivateButton';

import './Dao.scss';

const Dao = props => {
  const context = useWeb3Context();
  const client = useApolloClient();
  const [web3Service] = useContext(Web3Context);

  const [message, setMessage] = useState(null);
  const [daoData, setDaoData] = useState({});
  const [memberData, setMemberData] = useState();
  // const [isMemberOrApplicant, setIsMemberOrApplicant] = useState(false);
  const [visitor, setVisitor] = useState({
    isMember: false,
    isApplicant: false,
  });
  const [updateDelegateView, setUpdateDelegateView] = useState(false);
  const [updateRageView, setUpdateRageView] = useState(false);
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

  const closeMessage = () => {
    setMessage(null);
  };

  const setUpContract = async () => {
    if (web3Service) {
      const molochService = new MolochService(
        props.match.params.contractAddress,
        web3Service,
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

    if (data && web3Service) {
      console.log('data.factories[0]', data.factories[0]);

      if (!data.factories[0]) {
        props.history.push(
          `/building-dao/${props.match.params.contractAddress}`,
        );
        return false;
      }
      const tokenService = new TokenService(
        data.factories[0].tokenInfo.address,
        web3Service,
      );
      await tokenService.initContract();

      setDaoData(data.factories[0]);
      setTokenService(tokenService);
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

    // setIsMemberOrApplicant(isMember || isApplicant);
    setVisitor({ isMember, isApplicant });
  };

  if (!molochService) {
    return <p>Loading the DAO</p>;
  }

  return (
    <div>
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
          account={context.account.toLowerCase()}
        />
      ) : (
        <>
          {daoData.id ? (
            <>
              {message ? (
                <div className="SuccessMessage Flash">
                  <p>
                    {message} 
                  </p>
                  <div className="CloseFlash" onClick={() => closeMessage()}>x</div>
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
                      {context.active ? (
                        <>
                          {visitor.isMember ? (
                            <>
                              <p>Hello Member!</p>
                              <button onClick={() => setUpdateDelegateView(true)}>
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
                                  <p>If/when you become a Member, you'll see Member functions here.</p>
                                </>
                              ) : (
                                <>
                                  <Link to={`/apply/${molochService.contractAddr}`}>
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
                          <ActivateButton msg={'Sign in'} />
                        </>
                      )}
                      {!daoData.apiData.hidePokemol ? (
                        <div className="Dapp">
                          <p className="Label">Proposal and Voting dApp</p>
                          <a
                            className="Button Pokemol"
                            href={`${process.env.REACT_APP_POKEMOL_URL}/dao/${molochService.contractAddr}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <img src={PokemolBrand} />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                
                <div className="Dao">
                  <div className="Details">
                    <h4>Dao Details</h4>
                    <p className="Label">Bank</p>
                    <p className="Value Data">{daoData.tokenInfo.guildBankValue} {daoData.tokenInfo.symbol}</p>
                    <p className="Label">Members</p>
                    <p className="Value Data">
                      daoData.apiData.members.length
                    </p>
                    <p className="Label">Minimum Tribute</p>
                    <p className="Value Data">
                      {daoData.apiData.minimumTribute} {daoData.tokenInfo.symbol}
                    </p>
                    <p className="Label">Total Shares</p>
                    <p className="Value Data">{daoData.totalShares}</p>
                    <p className="Label">DAO Contract Address (Do NOT send funds here)</p>
                    <p className="Value Data"><a href={'https://etherscan.io/address/' + molochService.contractAddr} rel="noopener noreferrer">{molochService.contractAddr}</a></p>
                    <p className="Label">Summoner</p>
                    <p className="Value Data"><a href={'https://etherscan.io/address/' + daoData.summoner} rel="noopener noreferrer">{daoData.summoner}</a></p>
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
