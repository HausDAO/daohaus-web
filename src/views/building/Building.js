import React, { useState } from 'react';

import useInterval from '../../util/PollingUtil';
import { legacyGraph } from '../../util/legacyGraphService';
import { GET_MOLOCHES_POST, GET_MOLOCHES_POST_V2 } from '../../util/queries';

import './Building.scss';

const Building = props => {
  const { match, history } = props;
  const [daoReady, setDaoReady] = useState(false);
  const [delay, setDelay] = useState(2000);

  useInterval(async () => {
    let graphUri, query, entity;

    if (match.params.version === 'v1') {
      graphUri = process.env.REACT_APP_GRAPH_URI;
      query = GET_MOLOCHES_POST;
      entity = 'factories';
    } else {
      graphUri = process.env.REACT_APP_GRAPH_V2_URI;
      query = GET_MOLOCHES_POST_V2;
      entity = 'molochV2S';
    }

    let factoryQuery = await legacyGraph(graphUri, query);

    if (
      factoryQuery.data.data[entity].some(
        dao => dao.id === match.params.contractAddress,
      )
    ) {
      setDaoReady(true);
      setDelay(null);
    }
  }, delay);

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
        {!daoReady ? (
          <h4>Tidying up and preparing your Pokemol.</h4>
        ) : (
          <h4>Tidied up and Pokemol is ready.</h4>
        )}
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
        disabled={!daoReady}
        className="Building__button"
      >
        {daoReady ? 'Go to my dao page' : 'Preparing'}
      </button>
    </div>
  );
};

export default Building;
