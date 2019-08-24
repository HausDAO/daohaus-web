import React from "react";
import Web3Service from '../../util/web3Service';
// import BcProcessorService from '../../utils/BcProcessorService';
import { Formik, Form, Field, ErrorMessage } from "formik";

// import Loading from '../shared/Loading';

const SummonAdvForm = () => {
  //  const [loading, setLoading] = useContext(LoaderContext);

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

          // setLoading(true);
          try {
            setSubmitting(false);
            return false;

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

          resetForm();
          // setLoading(false);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="Form">
            <Field name="summoner">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Summoner</label>
                  <input type="text" {...field} />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="summoner"
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
