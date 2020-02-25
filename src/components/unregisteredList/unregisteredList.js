import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Web3Context } from '../../contexts/ContractContexts';
import EtherscanLink from '../etherscanLink/EtherscanLink';
import { put } from '../../util/requests';

const UnregisteredList = ({ dao, history }) => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();
  const [web3Service] = useContext(Web3Context);

  const handleStatusCheck = async () => {
    setLoading(true);

    console.log('dao', dao);

    const txRes = await web3Service.web3.eth.getTransactionReceipt(
      dao.transactionHash,
    );

    console.log('web3Service', web3Service);
    console.log('txRes', txRes);

    if (txRes.logs && txRes.logs.length && txRes.logs[0].address) {
      await put(`moloch/orphan/${dao.id}`, {
        contractAddress: txRes.logs[0].address,
      });

      history.push(`/building-dao/v2/${txRes.logs[0].address.toLowerCase()}`);
    } else {
      setMessage('Contract address not found. Maybe you can try again later?');
    }
  };

  return (
    <div className="UnregisteredList">
      {dao.contractAddress !== '0x0' ? (
        <div>
          <h4>{dao.name}</h4>
          <p>
            We found a dao that you tried to summon but it's not registered with
            Daohaus yet.
          </p>
          <Link to={`/building-dao/v2/${dao.contractAddress.toLowerCase()}`}>
            Go here to register
          </Link>
        </div>
      ) : (
        <div>
          <h4>{dao.name}</h4>
          <p>
            We found a dao that you tried to summon but we can't find the
            contract address
          </p>
          <p>There might have been an error during the summoning.</p>
          {message ? <p>{message}</p> : null}
          {loading ? (
            <p>Looking for the contract...</p>
          ) : (
            <>
              {dao.transactionHash ? (
                <>
                  <button onClick={() => handleStatusCheck()}>
                    Search for contract address
                  </button>
                  <EtherscanLink txHash={dao.transactionHash} />
                </>
              ) : (
                <>
                  <p>Maybe there is an issue with the transaction?</p>
                  <EtherscanLink txHash={dao.transactionHash} />
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(UnregisteredList);
