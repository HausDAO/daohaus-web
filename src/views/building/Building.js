import React, { useState } from 'react';
import useInterval from '../../util/PollingUtil';
import { legacyGraph } from '../../util/legacyGraphService';
import { GET_MOLOCHES_POST } from '../../util/queries';

import './Building.scss';

const Building = props => {
  const { match, history } = props;
  const [daoReady, setDaoReady] = useState(false);
  const [delay, setDelay] = useState(2000);

  useInterval(async () => {
    //not actually legacy but some query TODO: rename function
    let factoryQuery = await legacyGraph(
      process.env.REACT_APP_GRAPH_URI,
      GET_MOLOCHES_POST,
    );
    if (
      factoryQuery.data.data.factories.some(
        factory => factory.id === match.params.contractAddress,
      )
    ) {
      setDaoReady(true);
      setDelay(null);
    }
  }, delay);

  return (
    <div className="View">
      <h1>Your DAO is generating</h1>
      <p>And so is your Pokemol!</p>
      <button
        onClick={() => history.push(`/dao/${match.params.contractAddress}`)}
        disabled={!daoReady}
        className="Building__button"
      >
        {daoReady ? 'Go to my dao page' : 'processing'}
      </button>

      <div>
        <h2>HELP DOCUMENTATION COMING SOON!</h2>
      </div>
    </div>
  );
};

export default Building;
