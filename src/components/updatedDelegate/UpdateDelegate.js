import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useWeb3Context } from 'web3-react';

import Loading from '../loading/Loading';

const UpdateDelegate = props => {
  const { contract, contractAddress, setComplete, history } = props;

  const context = useWeb3Context();

  const [loading, setLoading] = useState(false);
  const [txHash, settxHash] = useState('');
  const [formError, setformError] = useState('');

  return (
    <>
      {loading ? (
        <Loading msg={'Updating Delegate'} txHash={txHash} />
      ) : (
        <div className="View SmallContainer">
          <Formik
            initialValues={{
              address: '',
            }}
            validate={values => {
              let errors = {};
              if (!values.address) {
                errors.address = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setLoading(true);

              try {
                await contract.methods
                  .updateDelegateKey(values.address)
                  .send({ from: context.account })
                  .once('transactionHash', txHash => {
                    settxHash(txHash);
                  })
                  .on('receipt', async receipt => {
                    console.log('receipt', receipt);

                    setLoading(false);
                    history.push(
                      `/dao/v1/${contractAddress}?successMessage=delegate`,
                    );
                    setComplete(false);
                  })
                  .then(resp => {
                    return resp;
                  })
                  .catch(err => {
                    setLoading(false);

                    if (err.code === 4001) {
                      setformError(
                        `Approval rejected by user. Please try again.`,
                      );
                      return { error: err };
                    }
                    if (
                      err.indexOf(
                        'Error: Transaction was not mined within 50 blocks',
                      ) > -1
                    ) {
                      setformError(
                        `Rejected transaction is taking a long time. tx hash: ${txHash}`,
                      );
                      return { error: err };
                    }

                    setformError(`Something went wrong. Please try again.`);

                    return {
                      error: 'Rejected transaction is taking a long time. ',
                    };
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
                <h2>Update Delegate Form</h2>
                {formError && <small>{formError}</small>}
                <Field name="address">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Address</label>
                      <input type="text" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="address"
                  render={msg => <div className="Error">{msg}</div>}
                />

                <button type="submit" disabled={isSubmitting}>
                  Update Delegate
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default withRouter(UpdateDelegate);
