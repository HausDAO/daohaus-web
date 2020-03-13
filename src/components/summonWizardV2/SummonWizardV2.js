import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { FormikWizard } from 'formik-wizard';

import { useWeb3Context } from 'web3-react';

import MolochV2Abi from '../../contracts/molochV2.json';
import MolochV2Bytecode from '../../contracts/molochV2Bytecode.json';

import { post, remove, put } from '../../util/requests';
import summonSteps from './SummonSteps';
import Loading from '../loading/Loading';

import { Web3Context } from '../../contexts/ContractContexts';

function FormWrapper({
  children,
  isLastStep,
  status,
  goToPreviousStep,
  canGoBack,
  actionLabel,
}) {
  return (
    <div className="Wizard">
      {children}
      {status && <div className="Status">{status.message}</div>}
      <div className="ButtonGroup">
        {canGoBack ? (
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={!canGoBack}
          >
            Previous
          </button>
        ) : (
          <div> </div>
        )}

        <button type="submit">
          {actionLabel || (isLastStep ? 'Summon!' : 'Next step')}
        </button>
      </div>
    </div>
  );
}

const SummonWizardV2 = props => {
  const context = useWeb3Context();
  const [loading, setLoading] = useState(false);
  const [formError, setformError] = useState('');
  const [txHash, setTxHash] = useState();

  const [web3Service] = useContext(Web3Context);

  const handleSubmit = async values => {
    if (
      parseInt(web3Service.toWei(values.deposit.proposalDeposit)) <
      parseInt(web3Service.toWei(values.deposit.processingReward))
    ) {
      setformError('Deposit must be greater than reward.');
      setLoading(false);
      return false;
    }

    setLoading(true);

    try {
      const cacheMoloch = {
        summonerAddress: context.account,
        name: values.dao.name.trim(),
        minimumTribute: values.currency.minimumTribute,
        description: values.dao.description,
        version: 2,
      };
      // cache dao incase of web3 timeout timeout
      const cacheId = await post('moloch/orphan', cacheMoloch);

      const molochV2Contract = await web3Service.createContract(MolochV2Abi);

      const deployedContract = await molochV2Contract.deploy({
        data: '0x' + MolochV2Bytecode.object,
        arguments: [
          context.account,
          [values.currency.approvedToken],
          values.timing.periodDuration,
          values.timing.votingPeriodLength,
          values.timing.gracePeriodLength,
          '' + web3Service.toWei(values.deposit.proposalDeposit),
          values.deposit.dilutionBound,
          '' + web3Service.toWei(values.deposit.processingReward),
        ],
      });

      await deployedContract
        .send(
          {
            from: context.account,
          },
          function(error, transactionHash) {
            console.log('any error?: ', error, 'tx: ', transactionHash);
            setTxHash(transactionHash);
          },
        )
        .on('error', function(err) {
          console.log(err);

          if (err && err.code === 4001) {
            //remove from cache
            remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
              console.log('dao rejected, remove cache');
              setformError('Transaction Rejected by user.');
            });
            if (
              err.message.indexOf(
                'Error: Transaction was not mined within 50 blocks',
              ) > -1
            ) {
              setformError(
                `rejected transaction is taking a long time. tx hash: ${txHash}`,
              );
              return { error: err };
            }
          }
          console.log(err);
        })
        .on('transactionHash', function(transactionHash) {
          put(`moloch/orphan/${cacheId.data.id}`, {
            transactionHash: transactionHash,
          }).then(() => {
            console.log('dao txhash updated');
          });
          console.log('on transactionHash', transactionHash);
        })
        .on('receipt', function(receipt) {
          console.log(receipt); // contains the new contract address
          const contractAddress = receipt.contractAddress;

          console.log('on receipt');

          put(`moloch/orphan/${cacheId.data.id}`, {
            contractAddress: contractAddress,
          })
            .then(() => {
              console.log('dao txhash updated');
            })
            .then(orphanRes => {
              props.history.push(
                `/building-dao/v2/${contractAddress.toLowerCase()}`,
              );
            })
            .catch(err => {
              setLoading(false);
              console.log('orphan update error', err);
            });

          setLoading(false);
        })
        .then(function(newContractInstance) {
          console.log('final then');

          console.log(newContractInstance); // instance with the new contract address
        });
    } catch (err) {
      console.log(err);
      // alert(`Something went wrong. please try again`);
      setformError(`Something went wrong. please try again`);

      setLoading(false);
    }
  };

  return (
    <>
      {context.account ? (
        <>
          {!loading ? (
            <>
              {formError && <small style={{ color: 'red' }}>{formError}</small>}
              <FormikWizard
                steps={summonSteps}
                onSubmit={handleSubmit}
                render={FormWrapper}
              />
            </>
          ) : (
            <Loading msg={'Summoning'} txHash={txHash} />
          )}
        </>
      ) : (
        <p>Connect your metamask account</p>
      )}
    </>
  );
};

export default withRouter(SummonWizardV2);
