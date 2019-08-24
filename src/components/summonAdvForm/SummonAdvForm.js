import React from "react";
import Web3Service from "../../util/web3Service";
import DaoAbi from "../../contracts/moloch.json";
import DaoByteCode from "../../contracts/molochByteCode.json";
import { post } from "../../util/requests";

// import BcProcessorService from '../../utils/BcProcessorService';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useWeb3Context } from "web3-react";

console.log(DaoAbi, DaoByteCode);

// import Loading from '../shared/Loading';

const SummonAdvForm = () => {
  //  const [loading, setLoading] = useContext(LoaderContext);
  const context = useWeb3Context();
  console.log(context);

  return (
    <>
      {/* {loading && <Loading />} */}

      <h2>Advanced Summon Form</h2>
      <Formik
        initialValues={{
          summoner: "",
          approvedToken: "",
          periodDuration: "",
          votingPeriodLength: "",
          gracePeriodLength: "",
          abortWindow: "",
          proposalDeposit: "",
          dilutionBound: "",
          processingReward: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.summoner) {
            errors.summoner = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const web3Service = new Web3Service();
          // const bcprocessor = new BcProcessorService();
          console.log("lol", DaoAbi);

          // setLoading(true);
          try {
            setSubmitting(false);
            const daoContract = await web3Service.createContract(DaoAbi);
            console.log("contract", daoContract);
            console.log("account", context.account);

            const deployedContract = await daoContract.deploy({
              data: DaoByteCode.object,
              arguments: [
                values.summoner,
                values.approvedToken,
                values.periodDuration,
                values.votingPeriodLength,
                values.gracePeriodLength,
                values.abortWindow,
                values.proposalDeposit,
                values.dilutionBound,
                values.processingReward
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
              })
              .on("confirmation", function(confirmationNumber, receipt) {
                console.log(confirmationNumber, receipt);
              })
              .then(function(newContractInstance) {
                console.log(newContractInstance.options.address); // instance with the new contract address
              });

            // bcprocessor.setTx(
            //   hash,
            //   currentUser.attributes["custom:account_address"],
            //   `Withdraw Eth: ${values.amount}`,
            //   true
            // );
          } catch (err) {
            console.log(err);
            alert(`Something went wrong. please try again`);
          }

          // resetForm();
          // setLoading(false);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="Form">
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
                  <label>description</label>
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
                  <label>Approved Token</label>
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
                  <label>Period Duration</label>
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
                  <label>Voting Period Length</label>
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
                  <label>Grace Period Length</label>
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
                  <label>Abort Window</label>
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
                  <label>minumumTribute</label>
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
                  <label>Proposal Deposit</label>
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

            <Field name="dilutionBound">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Dilution Bound</label>
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

            <Field name="processingReward">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Processing Reward</label>
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
