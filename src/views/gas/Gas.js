import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useApolloClient } from 'react-apollo';

import { GET_GASSY, GET_MEMBER_GAS } from '../../util/queries';
import { useWeb3Context } from 'web3-react';
import { Web3Context } from '../../contexts/ContractContexts';

import './Gas.scss';
import GasLeaderItem from '../../components/gas/GasLeaderItem';

const Gas = () => {
  const context = useWeb3Context();
  const client = useApolloClient();
  const [web3Service] = useContext(Web3Context);
  const [yourGas, setYourGas] = useState();
  const { loading, error, data } = useQuery(GET_GASSY);

  console.log('context', context);

  console.log('data', data);

  useEffect(() => {
    const getYourGas = async () => {
      const { data } = await client.query({
        query: GET_MEMBER_GAS,
        variables: { memberAddress: context.account },
      });

      console.log('data 2', data);

      const totalGas = data.badges[0].totalGas || 0;
      const poo = web3Service.fromWei(totalGas);

      console.log('poo', poo);
      setYourGas(web3Service.fromWei(totalGas));
    };

    if (context.account) {
      getYourGas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.account]);

  const renderLeaders = leaders => {
    return leaders.map((leader, i) => {
      return <GasLeaderItem leader={leader} i={i} key={i} />;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error - use mainnet :(</p>;

  return (
    <div className="View">
      <h1>Who's spending most gas in the Molochverse?</h1>

      {yourGas ? (
        <p>You've spent {yourGas} Ξ</p>
      ) : (
        <p>Sign in to see how you stack up.</p>
      )}

      <h3>The Gassiest</h3>

      <div>{renderLeaders(data.gassiest)}</div>
    </div>
  );
};

export default Gas;
