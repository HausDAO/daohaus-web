import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../util/requests';
import ApplicationList from '../../components/applicationList/ApplicationList';
import ApplyButton from '../../components/applyButton/applyButton';

import DaoAbi from '../../contracts/moloch';

import './Dao.scss';
import { useWeb3Context } from 'web3-react';
import UpdateDelegate from '../../components/updatedDelegate/UpdateDelegate';
import RageQuit from '../../components/rageQuit/RageQuit';

import { Web3Context, MolochContext } from '../../contexts/ContractContexts';
import { addressToToken } from '../../util/constants';
import { Query } from 'react-apollo';
import { GET_MEMBERDATA, GET_MEMBERDATA_LEGACY } from '../../util/queries';
import { legacyGraph } from '../../util/legacyGraphService';

const Dao = props => {
  const context = useWeb3Context();
  const [daoData, setDaoData] = useState({});
  const [applications, setApplications] = useState({});
  const [contractData, setContractData] = useState({});
  const [updateDelegateView, setUpdateDelegateView] = useState(false);
  const [updateRageView, setUpdateRageView] = useState(false);
  const [isMemberOrApplicant, setIsMemberOrApplicant] = useState(false);

  const [molochContract, setMolochContract] = useState();
  const [molochContext, setMolochContext] = useContext(MolochContext);
  const [web3Service] = useContext(Web3Context);

  useEffect(() => {
    if (context.active && applications.length) {
      const applicantData = applications.find(applicant => {
        return (
          applicant.applicantAddress.toLowerCase() ===
          context.account.toLowerCase()
        );
      });
      if (applicantData) {
        setIsMemberOrApplicant(true);
      }
    }
  }, [context, applications]);

  useEffect(() => {
    const fetchData = async () => {
      if (!molochContract) {
        console.log('setup contract');

        const contract = await web3Service.initContract(
          DaoAbi,
          props.match.params.contractAddress,
        );
        setMolochContext(contract);
        setMolochContract(contract);
      } else {
        console.log('contract set');

        const daoRes = await get(
          `moloch/${props.match.params.contractAddress}`,
        );
        setDaoData(daoRes.data);
        console.log('daoData', daoRes.data);
        console.log('daodata addr', daoRes.data.contractAddress);

        if(daoRes.data.isLegacy){
          const legacyData = await legacyGraph('', GET_MEMBERDATA_LEGACY)
          console.log('legacyData', legacyData );
          
        }

        const applicationRes = await get(
          `moloch/${props.match.params.contractAddress}/applications`,
        );
        console.log('applicationRes.data', applicationRes.data);

        setApplications(applicationRes.data);

        const totalShares = await molochContract.methods
          .totalShares()
          .call({}, 'latest');
        const token = await molochContract.methods.approvedToken().call();
        console.log('totalShares, token', totalShares, token);

        setContractData({ totalShares, token });
      }
    };

    if (web3Service) {
      fetchData();
    }
  }, [props.match.params.contractAddress, web3Service, molochContract]);

  return (
    <div className="View">
      {' '}
      {updateDelegateView ? (
        <UpdateDelegate contract={molochContract} />
      ) : updateRageView ? (
        <RageQuit contract={molochContract} />
      ) : (
        <>
          {daoData.contractAddress ? (
            <div>
              <h2 className="DaoName">{daoData.name}</h2>
              <p className="Large">{daoData.description}</p>
              {daoData.daoUrl && (
                <a
                  className="small"
                  href={daoData.daoUrl}
                  alt="link to dao site"
                >
                  {daoData.daoUrl}
                </a>
              )}
              <p className="Label">Shares</p>
              <p className="Value Data">{contractData.totalShares}</p>
              <p className="Label">Summoner</p>
              <p className="Value Data">{daoData.summonerAddress}</p>
              <p className="Label">Minimum Tribute</p>
              <p className="Value Data">
                {daoData.minimumTribute} {addressToToken[contractData.token]}
              </p>
              {isMemberOrApplicant ? (
                <>
                  <p>You are a member or applicant.</p>
                  <button onClick={() => setUpdateDelegateView(true)}>
                    Update Delegate{' '}
                  </button>
                  <br />
                  <button onClick={() => setUpdateRageView(true)}>
                    Rage Quit{' '}
                  </button>
                </>
              ) : (
                <>
                  <ApplyButton contractAddress={daoData.contractAddress} />
                </>
              )}{' '}
              {!daoData.isLegacy ? (
                <>
                  <h3>Pledges</h3>
                  <Query
                    query={GET_MEMBERDATA}
                    variables={{ contractAddr: daoData.contractAddress }}
                  >
                    {({ loading, error, data }) => {
                      return (
                        <div className="ApplicationList">
                          {data && (
                            <ApplicationList
                              applications={applications}
                              daoData={daoData}
                              contractData={contractData}
                              contract={molochContract}
                              data={data}
                            />
                          )}
                        </div>
                      );
                    }}
                  </Query>
                </>
              ) : (
                <div className="ApplicationList">
                    <ApplicationList
                      applications={applications}
                      daoData={daoData}
                      contractData={contractData}
                      contract={molochContract}
                      data={[]}
                    />
                </div>
              )}{' '}
            </div>
          ) : (
            <p>THE HAUS IS LOADING THE DAO</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dao;
