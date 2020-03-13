import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import MolochV2Abi from '../../contracts/molochV2.json';
import MolochV2Bytecode from '../../contracts/molochV2Bytecode.json';

import { post, remove, put } from '../../util/requests';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useWeb3Context } from 'web3-react';
import Loading from '../loading/Loading';

import { Web3Context } from '../../contexts/ContractContexts';

import './SummonAdvV2Form.scss';

// import Loading from '../shared/Loading';

const SummonAdvV2Form = props => {
  const [loading, setLoading] = useState(false);
  const [formError, setformError] = useState('');
  const [txHash, setTxHash] = useState();
  const context = useWeb3Context();
  const [web3Service] = useContext(Web3Context);

  return (
    <>
      {!loading ? (
        <>
          {formError && <small style={{ color: 'red' }}> {formError}</small>}
          <Formik
            initialValues={{
              name: '',
              description: '',
              approvedTokens: '' + process.env.REACT_APP_WETH_ADDRESS,
              periodDuration: '',
              votingPeriodLength: '',
              gracePeriodLength: '',
              minimumTribute: '',
              proposalDeposit: '',
              processingReward: '',
              dilutionBound: '',
            }}
            validate={values => {
              let errors = {};

              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.description) {
                errors.description = 'Required';
              }
              if (!values.approvedTokens) {
                errors.approvedTokens = 'Required';
              }
              if (!values.periodDuration) {
                errors.periodDuration = 'Required';
              }
              if (!values.votingPeriodLength) {
                errors.votingPeriodLength = 'Required';
              }
              if (!values.gracePeriodLength) {
                errors.gracePeriodLength = 'Required';
              }
              if (!values.minimumTribute) {
                errors.minimumTribute = 'Required';
              }

              if (!values.proposalDeposit) {
                errors.proposalDeposit = 'Required';
              }
              if (!values.processingReward) {
                errors.processingReward = 'Required';
              }
              if (!values.dilutionBound) {
                errors.dilutionBound = 'Required';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setLoading(true);
              setSubmitting(true);

              try {
                const cacheMoloch = {
                  summonerAddress: context.account,
                  name: values.name.trim(),
                  minimumTribute: values.minimumTribute,
                  description: values.description,
                  version: 2,
                };
                // cache dao incase of web3 timeout timeout
                const cacheId = await post('moloch/orphan', cacheMoloch);

                // const factoryContract = await web3Service.initContract(
                //   FactoryAbi,
                //   process.env.REACT_APP_FACTORY_V2_CONTRACT_ADDRESS,
                // );

                const molochV2Contract = await web3Service.createContract(
                  MolochV2Abi,
                );

                // msg.sender,
                // _approvedTokens,
                // _periodDuration,
                // _votingPeriodLength,
                // _gracePeriodLength,
                // _proposalDeposit,
                // _dilutionBound,
                // _processingReward

                const deployedContract = await molochV2Contract.deploy({
                  data: MolochV2Bytecode.object,
                  arguments: [
                    context.account,
                    values.approvedTokens.split(',').map(item => item.trim()),
                    values.periodDuration,
                    values.votingPeriodLength,
                    values.gracePeriodLength,
                    '' + values.proposalDeposit,
                    values.dilutionBound,
                    '' + values.processingReward,
                  ],
                });

                await deployedContract
                  .send(
                    {
                      from: context.account,
                    },
                    function(error, transactionHash) {
                      console.log(
                        'any error?: ',
                        error,
                        'tx: ',
                        transactionHash,
                      );
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

                    resetForm();
                    setLoading(false);
                    setSubmitting(false);
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
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Name</label>
                      <input type="text" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="description">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Description</label>
                      <input type="text" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="approvedTokens">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>
                        Approved Tokens (Comma separated list of ERC-20 contract
                        addresses. The 1st token in the list will be your
                        Deposit Token/Base Currency)
                      </label>
                      <input type="text" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="approvedTokens"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="periodDuration">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Period Duration (Seconds)</label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="periodDuration"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="votingPeriodLength">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Voting Period Length (Number of Periods)</label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="votingPeriodLength"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="gracePeriodLength">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Grace Period Length (Number of Periods)</label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="gracePeriodLength"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="minimumTribute">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Minumum Tribute (Base Currency)</label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="minimumTribute"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="proposalDeposit">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>
                        Proposal Deposit (Should be in your Base Currency units,
                        often with 18 decimals places. For example if you want
                        this to be .1 WETH you should enter 1 with 17 zeros
                        after it: 100000000000000000)
                      </label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="proposalDeposit"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="processingReward">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>
                        Processing Reward (Should be in your Base Currency
                        units, often with 18 decimals places. For example if you
                        want this to be .01 WETH you should enter 1 with 16
                        zeros after it: 100000000000000000)
                      </label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="processingReward"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <Field name="dilutionBound">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Dilution Bound (Use 3 if not sure)</label>
                      <input
                        min="0"
                        type="number"
                        inputMode="numeric"
                        step="any"
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="dilutionBound"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <button type="submit" disabled={isSubmitting}>
                  Summon
                </button>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        loading && <Loading msg={'Summoning'} txHash={txHash} />
      )}
    </>
  );
};

export default withRouter(SummonAdvV2Form);
