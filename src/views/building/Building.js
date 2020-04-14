import React, { useState, useContext } from 'react';

import useInterval from '../../util/PollingUtil';
import { legacyGraph } from '../../util/legacyGraphService';
import {
  GET_MOLOCHES_POST,
  GET_MOLOCHES_POST_V2,
  GET_SUPER_MOLOCH,
} from '../../util/queries';

import './Building.scss';
import { Web3Context } from '../../contexts/ContractContexts';
import { useWeb3Context } from 'web3-react';
import { get, post, remove } from '../../util/requests';

import FactoryAbi from '../../contracts/factoryV2.json';
import { useApolloClient } from 'react-apollo';

const Building = props => {
  const { match, history } = props;
  const [daoReady, setDaoReady] = useState(false);
  const [daoValid, setDaoValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setformError] = useState('');
  const [txHash, setTxHash] = useState();
  const [unregisteredDao, setUnregisteredDao] = useState();
  const [delay, setDelay] = useState(2000);
  const context = useWeb3Context();
  const [web3Service] = useContext(Web3Context);
  const client = useApolloClient();

  useInterval(async () => {
    if (match.params.version === 'v1') {
      const { data } = await client.query({
        query: GET_SUPER_MOLOCH,
        variables: { contractAddr: match.params.contractAddress },
      });

      if (data.moloch) {
        setDaoReady(true);
        setDaoValid(true);
        setDelay(null);
      }
    } else {
      await fetchOrphan();

      if (unregisteredDao) {
        setDaoReady(true);
        setDelay(null);
      }
    }
  }, delay);

  const fetchOrphan = async () => {
    if (context.account) {
      const orphan = await get(
        `moloch/orphans/contract/${match.params.contractAddress.toLowerCase()}`,
      );

      setUnregisteredDao(orphan.data);
    }
  };

  const registerDao = async () => {
    if (!unregisteredDao) {
      return;
    }
    setLoading(true);

    //get all events of this moloch should not be more than one
    // user should be summonor
    const factoryContract = web3Service.initContract(
      FactoryAbi,
      process.env.REACT_APP_FACTORY_V2_CONTRACT_ADDRESS,
    );

    factoryContract.methods
      .registerDao(match.params.contractAddress, unregisteredDao.name, 2)
      .send(
        {
          from: context.account,
        },
        function(error, transactionHash) {
          console.log(error, transactionHash);
          setTxHash(transactionHash);
        },
      )
      .on('receipt', function() {
        const newMoloch = {
          summonerAddress: context.account,
          contractAddress: match.params.contractAddress,
          name: unregisteredDao.name,
          minimumTribute: unregisteredDao.minimumTribute,
          description: unregisteredDao.description,
          version: 2,
        };

        post('moloch', newMoloch)
          .then(newMolochRes => {
            //remove from cache and redirect
            remove(`moloch/orphan/${unregisteredDao.id}`).then(() => {
              props.history.push(
                `/building-dao/v2/${match.params.contractAddress.toLowerCase()}`,
              );
            });
          })
          .catch(err => {
            setLoading(false);
            console.log('moloch creation error', err);
          });

        setDaoValid(true);
      })
      .on('error', function(err) {
        setformError(`Something went wrong. ahhhhhhhhhhhh`);

        setLoading(false);
      });
  };

  return (
    <div className="View SmallContainer">
      <div className="Building">
        <h3>Your dao contracts are ready.</h3>
      </div>
      <div className={!daoReady ? 'Building Processing' : 'Building Processed'}>
        {!daoReady ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#513e97"
              strokeWidth="10"
              r="35"
              strokeDasharray="164.93361431346415 56.97787143782138"
              transform="rotate(47.9221 50 50)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              ></animateTransform>
            </circle>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              fill="#4EBD9E"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"
            />
          </svg>
        )}

        <div>
          {!daoReady && <h4>Tidying up and preparing your Pokemol.</h4>}

          {daoReady && match.params.version === 'v2' && (
            <>
              {!loading && !daoValid ? (
                <button onClick={() => registerDao()}>Launch V2 Pokemol</button>
              ) : (
                <p>
                  {!daoValid && 'building pokemol'} {txHash}
                </p>
              )}
              {formError && <p>{formError}</p>}
            </>
          )}
          {daoReady && match.params.version === 'v1' && (
            <h4>Tidied up and Pokemol is ready.</h4>
          )}
        </div>
      </div>
      <p>
        <strong>Daohaus</strong> launches your dao contracts and preps a page
        where people can discover and pledge to your dao.
      </p>
      <p>
        <strong>Pokemol</strong> is where you and your members submit and vote
        on proposals.{' '}
      </p>

      <button
        onClick={() =>
          history.push(
            `/dao/${match.params.version}/${match.params.contractAddress}`,
          )
        }
        disabled={!daoReady || !daoValid}
        className="Building__button"
      >
        {daoReady ? 'Go to my dao page' : 'Preparing'}
      </button>
    </div>
  );
};

export default Building;
