import React, { useState } from "react";
import Web3Service from "../../util/web3Service";
import DaoAbi from "../../contracts/moloch.json";
import DaoByteCode from "../../contracts/molochByteCode.json";
import { post } from "../../util/requests";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useWeb3Context } from "web3-react";
import Loading from "../loading/Loading";

import "./SummonAdvForm.scss";

// import Loading from '../shared/Loading';

const SummonAdvForm = () => {
  const [loading, setLoading] = useState(false);
  const context = useWeb3Context();

  return (
    <>
      {loading && <Loading />}

      <h2>Summon (Hard Mode)</h2>
      <Formik
        initialValues={{
          name: "",
          description: "",
          approvedToken: "",
          periodDuration: "",
          votingPeriodLength: "",
          gracePeriodLength: "",
          abortWindow: "",
          proposalDeposit: "",
          processingReward: "",
          dilutionBound: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.summoner) {
            errors.summoner = "Required";
          }
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (!values.approvedToken) {
            errors.approvedToken = "Required";
          }
          if (!values.periodDuration) {
            errors.periodDuration = "Required";
          }
          if (!values.votingPeriodLength) {
            errors.votingPeriodLength = "Required";
          }
          if (!values.gracePeriodLength) {
            errors.gracePeriodLength = "Required";
          }
          if (!values.abortWindow) {
            errors.abortWindow = "Required";
          }
          if (!values.proposalDeposit) {
            errors.proposalDeposit = "Required";
          }
          if (!values.processingReward) {
            errors.processingReward = "Required";
          }
          if (!values.dilutionBound) {
            errors.dilutionBound = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const web3Service = new Web3Service();

          setLoading(true);
          try {
            const daoContract = await web3Service.createContract(DaoAbi);

            const deployedContract = await daoContract.deploy({
              data: DaoByteCode.object,
              arguments: [
                context.account,
                values.approvedToken,
                values.periodDuration,
                values.votingPeriodLength,
                values.gracePeriodLength,
                values.abortWindow,
                values.proposalDeposit,
                values.processingReward,
                values.dilutionBound
              ]
            });

            console.log("deployedContract", deployedContract);

            deployedContract
              .send(
                {
                  from: context.account
                },
                function(error, transactionHash) {
                  console.log(error, transactionHash);
                }
              )
              .on("error", function(error) {
                console.log(error);
              })
              .on("transactionHash", function(transactionHash) {
                console.log(transactionHash);
              })
              .on("receipt", function(receipt) {
                console.log(receipt.contractAddress); // contains the new contract address
                const newMoloch = {
                  summonerAddress: context.account,
                  contractAddress: receipt.contractAddress,
                  name: values.name,
                  minumumTribute: values.minumumTribute,
                  description: values.description
                };

                post("moloch", newMoloch)
                  .then(newMolochRes => {
                    console.log("created new moloch", newMolochRes);
                  })
                  .catch(err => {
                    console.log("moloch creation error", err);
                  });

                resetForm();
                setLoading(false);
                setSubmitting(false);
              })
              .on("confirmation", function(confirmationNumber, receipt) {
                console.log(confirmationNumber, receipt);
              })
              .then(function(newContractInstance) {
                console.log(newContractInstance.options.address); // instance with the new contract address
              });
          } catch (err) {
            console.log(err);
            alert(`Something went wrong. please try again`);
            setLoading(false);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
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
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Description</label>
                  <input type="text" {...field} />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="description"
              render={msg => <div className="Error">{msg}</div>}
            />

            <Field name="approvedToken">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>
                    Approved Token (ERC-20 Contract Address - needs Approve)
                  </label>
                  <input type="text" {...field} />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="approvedToken"
              render={msg => <div className="Error">{msg}</div>}
            />

            <Field name="periodDuration">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
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
                <div className={field.value ? "Field HasValue" : "Field "}>
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
                <div className={field.value ? "Field HasValue" : "Field "}>
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

            <Field name="abortWindow">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Abort Window (Number of Periods)</label>
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
              name="abortWindow"
              render={msg => <div className="Error">{msg}</div>}
            />

            <Field name="minumumTribute">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
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
              name="minumumTribute"
              render={msg => <div className="Error">{msg}</div>}
            />

            <Field name="proposalDeposit">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Proposal Deposit (Base Currency 18 decimals)</label>
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
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Processing Reward (Base Currency 18 decimals)</label>
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
                <div className={field.value ? "Field HasValue" : "Field "}>
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
  );
};

export default SummonAdvForm;
