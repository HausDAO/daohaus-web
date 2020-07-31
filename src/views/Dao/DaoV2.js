import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useApolloClient } from 'react-apollo';

import { Web3Context, MolochContext } from '../../contexts/ContractContexts';
import { GET_MOLOCH } from '../../util/queries';
import { successMessagesText } from '../../util/helpers';
import MolochService from '../../util/moloch-service';
import HeadTags from '../../components/Shared/HeadTags/HeadTags';
import ApplicationList from '../../components/MemberList/ApplicationList';

import './Dao.scss';

const DaoV2 = props => {
  const client = useApolloClient();
  const [web3Context] = useContext(Web3Context);

  const [message, setMessage] = useState(null);
  const [daoData, setDaoData] = useState({});
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
  }, [web3Context]);

  useEffect(() => {
    setUpContract();
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

      setDaoData(data.moloch);
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
                  {!daoData.apiData.hidePokemol ? (
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
                  <p className="Label">Moloch V2 Dao </p>
                  <p className="Value Data"></p>
                  <p className="Label">Members</p>
                  <p className="Value Data">{daoData.members.length}</p>
                  <p className="Label">Total Shares</p>
                  <p className="Value Data">{daoData.totalShares}</p>
                  <p className="Label">DAO Contract Address</p>
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
      {daoData.members && molochService ? (
        <div className="View">
          <ApplicationList
            members={{ active: daoData.members, applicants: [] }}
            daoData={daoData}
            contract={molochService.contract}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DaoV2;
