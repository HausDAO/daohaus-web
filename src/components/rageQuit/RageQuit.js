import React, {useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useWeb3Context } from 'web3-react';

// import Loading from '../shared/Loading';

const RageQuit = ({ contract }) => {
  const context = useWeb3Context();
  const [formError, setformError] = useState('');

  return (
    <>
      {/* {loading && <Loading />} */}

      <h2>Rage Quit (testing)</h2>
      {formError && <small>{formError}</small>}

      <Formik
        initialValues={{
          amount: 0,
        }}
        validate={values => {
          let errors = {};

          if (!values.amount) {
            errors.amount = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // setLoading(true);
          try {
            await contract.methods
              .ragequit(values.amount)
              .send({ from: context.account })
              .once('transactionHash', txHash => {
                console.log('txHash', txHash);
                setformError(`transaction sent hash: ` + txHash);
                resetForm();
              })
              .on('receipt', async receipt => {
                console.log('receipt', receipt);
              })
              .then(resp => {
                return resp;
              })
              .catch(err => {
                //setLoading(false);
                console.log(err);
                return { error: 'rejected transaction' };
              });
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
            <Field name="amount">
              {({ field, form }) => (
                <div className={field.value ? 'Field HasValue' : 'Field '}>
                  <label>Shares</label>
                  <input type="text" {...field} />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="amount"
              render={msg => <div className="Error">{msg}</div>}
            />

            <button type="submit" disabled={isSubmitting}>
              Rage
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RageQuit;
