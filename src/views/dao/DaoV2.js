import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { useWeb3Context } from 'web3-react';
import queryString from 'query-string';

import {
  Web3Context,
  MolochContext,
  MolochV2Context,
} from '../../contexts/ContractContexts';
import { GET_MOLOCH_V2 } from '../../util/queries';
import { successMessagesText } from '../../util/helpers';
import MolochService from '../../util/molochService';
import ActivateButton from '../../components/activateButton/ActivateButton';
import HeadTags from '../../components/headTags/HeadTags';
import ApplicationList from '../../components/applicationList/ApplicationList';

import PokemolBrand from '../../assets/pokemol__brand--standard-white.svg';
import './Dao.scss';

const DaoV2 = props => {
  const context = useWeb3Context();
  const [MolochV2] = useContext(MolochV2Context);
  const [web3Service] = useContext(Web3Context);

  const [message, setMessage] = useState(null);
  const [daoData, setDaoData] = useState({});
  const [visitor] = useState({
    isMember: false,
    isApplicant: false,
  });
  const [molochService, setMolochService] = useContext(MolochContext);
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
    const { isLoading, isError, data } = await MolochV2.client.query({
      query: GET_MOLOCH_V2,
      variables: { contractAddr: props.match.params.contractAddress },
    });

    isLoading && setLoading(loading);
    isError && setError(error);

    if (data && web3Service) {
      if (!data.daos[0]) {
        const versionPath = props.location.pathname.split('/')[2];
        props.history.push(
          `/building-dao/${versionPath}/${props.match.params.contractAddress}`,
        );
        return false;
      }

      setDaoData({ ...data.daos[0], metadata: data.moloches[0] });
    }
  };

  if (!molochService) {
    return <p>Loading the DAO</p>;
  }

  return (
    <div>
      {daoData.id ? <HeadTags daoData={daoData} /> : null}

      {loading ? <p>Loading the DAO</p> : null}
      {error ? <p>Sorry there's been an error</p> : null}

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
                  {context.active ? (
                    <>
                      {visitor.isMember ? (
                        <p>Hello Member</p>
                      ) : (
                        <>
                          {visitor.isApplicant ? (
                            <>
                              <p>Hello Applicant!</p>
                              <p>
                                If/when you become a Member, you'll see Member
                                functions here.
                              </p>
                            </>
                          ) : (
                            <p>
                              PSYCH!! Not much to do here for V2 Moloch daos
                              yet.
                            </p>
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
                      <p className="Label">
                        Proposal and Voting dApp coming soon.
                      </p>
                      {/* <a
                        className="Button Pokemol"
                        href={`${process.env.REACT_APP_POKEMOL_URL}/dao/${molochService.contractAddr}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <img src={PokemolBrand} alt="pokemol" />
                      </a> */}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="Dao">
                <div className="Details">
                  <h4>Dao Details</h4>
                  <p className="Label">Moloch V2 Dao </p>
                  <p className="Value Data"></p>
                  <p className="Label">Members</p>
                  <p className="Value Data">
                    {daoData.metadata.members.length}
                  </p>
                  <p className="Label">Total Shares</p>
                  <p className="Value Data">{daoData.metadata.totalShares}</p>
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
                  <p className="Label">Summoner</p>
                  <p className="Value Data">
                    <a
                      href={'https://etherscan.io/address/' + daoData.summoner}
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
      {daoData.metadata && molochService ? (
        <div className="View">
          <ApplicationList
            members={{ active: daoData.metadata.members, applicants: [] }}
            daoData={daoData}
            contract={molochService.contract}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DaoV2;
