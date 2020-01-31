import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import FactoryAbi from '../../contracts/factoryV2.json';

import { post, remove } from '../../util/requests';

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
          <h2>Summon Moloch V2 (Hard Mode)</h2>
          {formError && <small style={{ color: 'red' }}>{formError}</small>}
          <Formik
            initialValues={{
              name: '',
              description: '',
              approvedTokens: '["0xd0a1e359811322d97991e03f863a0c30c2cf029c"]',
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
                  version: 2
                };
                // cache dao incase of web3 timeout timeout
                const cacheId = await post('moloch/orphan', cacheMoloch);

                const factoryContract = await web3Service.initContract(
                  FactoryAbi,
                  process.env.REACT_APP_FACTORY_V2_CONTRACT_ADDRESS,
                );

                await factoryContract.methods
                  .newDao(
                    values.approvedTokens,
                    values.periodDuration,
                    values.votingPeriodLength,
                    values.gracePeriodLength,
                    "" + values.proposalDeposit,
                    values.dilutionBound,
                    "" + values.processingReward,
                    values.name.trim(),
                  )
                  .send(
                    {
                      from: context.account,
                    },
                    function (error, transactionHash) {
                      console.log(error, transactionHash);
                      setTxHash(transactionHash);
                    },
                  )
                  .on('error', function (err) {
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
                  .on('transactionHash', function (transactionHash) {
                    console.log(transactionHash);
                  })
                  .on('receipt', function (receipt) {
                    console.log(receipt.events.Register); // contains the new contract address
                    const contractAddress =
                      receipt.events.Register.returnValues.moloch;

                    const newMoloch = {
                      summonerAddress: context.account,
                      contractAddress: contractAddress,
                      name: values.name.trim(),
                      minimumTribute: values.minimumTribute,
                      description: values.description,
                      version: 2
                    };

                    post('moloch', newMoloch)
                      .then(newMolochRes => {
                        //remove from cache and redirect
                        remove(`moloch/orphan/${cacheId.data.id}`).then(() => {
                          props.history.push(
                            `/building-dao/${contractAddress.toLowerCase()}`,
                          );
                        });
                      })
                      .catch(err => {
                        setLoading(false);
                        console.log('moloch creation error', err);
                      });

                    resetForm();
                    setLoading(false);
                    setSubmitting(false);
                  })
                  .on('confirmation', function (confirmationNumber, receipt) {
                    console.log(confirmationNumber, receipt);
                  })
                  .then(function (newContractInstance) {
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
                        Approved Tokens (Array of ERC-20 Contract Addresses)
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
                        Proposal Deposit (Base Currency 18 decimals)
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
                        Processing Reward (Base Currency 18 decimals)
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
