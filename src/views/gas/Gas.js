import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useApolloClient } from 'react-apollo';

import { GET_GASSY, GET_MEMBER_GAS } from '../../util/queries';
import { useWeb3Context } from 'web3-react';
import { Web3Context } from '../../contexts/ContractContexts';

import './Gas.scss';
import GasLeaderItem from '../../components/gas/GasLeaderItem';
import { getEthPrice } from '../../util/prices';
import ActivateButton from '../../components/activateButton/ActivateButton';

const Gas = () => {
  const context = useWeb3Context();
  const client = useApolloClient();
  const [web3Service] = useContext(Web3Context);
  const [yourGas, setYourGas] = useState();
  const [isLeader, setIsLeader] = useState();
  const [ethPrice, setEthPrice] = useState();
  const { loading, error, data } = useQuery(GET_GASSY);

  useEffect(() => {
    const fetchEthPrice = async () => {
      const res = await getEthPrice();

      setEthPrice(res);
    };

    fetchEthPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getYourGas = async () => {
      const { data } = await client.query({
        query: GET_MEMBER_GAS,
        variables: { memberAddress: context.account },
      });
      const totalGas = data.badges[0].totalGas || 0;

      setYourGas(web3Service.fromWei(totalGas));
    };

    if (context.account) {
      getYourGas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.account]);

  useEffect(() => {
    if (yourGas) {
      setIsLeader(
        data.gassiest.findIndex(leader => {
          return (
            leader.memberAddress.toLowerCase() === context.account.toLowerCase()
          );
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourGas]);

  const renderLeaders = leaders => {
    return leaders.map((leader, i) => {
      return (
        <GasLeaderItem leader={leader} i={i} ethPrice={ethPrice} key={i} />
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error - use mainnet :(</p>;

  return (
    <div className="View">
      <h1>The Gassiest</h1>
      <div className="Gas">
        <div className="Gas__leaderboard">
          <h4>Who's using the most gas in the Molochverse?</h4>
          <div>{renderLeaders(data.gassiest)}</div>
        </div>
        <div className="Gas__user">
          <h3>How do you stack up?</h3>
          {yourGas ? (
            <>
              <h4>You've used </h4>
              <p>{yourGas} Ξ </p>
              <p>(${(yourGas * ethPrice).toFixed(2)})</p>

              {isLeader >= 0 ? (
                <>
                  <h4>We have a big spender!</h4>
                  <h4>
                    You're #{isLeader + 1}!!
                    <span role="img" aria-label="clap">
                      👏
                    </span>
                    <span role="img" aria-label="party">
                      🎉
                    </span>
                  </h4>
                </>
              ) : (
                <p>Not on the leaderboard yet. Keep at it.</p>
              )}
            </>
          ) : (
            <ActivateButton msg={'Sign in'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gas;
