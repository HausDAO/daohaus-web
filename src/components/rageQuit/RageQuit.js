import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useWeb3Context } from 'web3-react';

import Loading from '../loading/Loading';

const RageQuit = props => {
  const { contract, contractAddress, setComplete, history, memberData,account } = props;

  const context = useWeb3Context();
  const [formError, setformError] = useState('');
  const [txHash, settxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const shares = memberData.active.find(member => member.memberId===account).shares;

  return (
    <>
      {loading ? (
        <Loading msg={'Raging'} txHash={txHash} />
      ) : (
        <>
          <h2>Rage Quit</h2>
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
              if (values.amount > shares) {
                errors.amount = 'Can not rage more that you have';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setLoading(true);

              try {
                await contract.methods
                  .ragequit(values.amount)
                  .send({ from: context.account })
                  .once('transactionHash', txHash => {
                    console.log('txHash', txHash);
                    settxHash(txHash);
                  })
                  .on('receipt', async receipt => {
                    console.log('receipt', receipt);

                    setLoading(false);
                    history.push(`/dao/${contractAddress}?successMessage=rage`);
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
                <Field name="amount">
                  {({ field, form }) => (
                    <div className={field.value ? 'Field HasValue' : 'Field '}>
                      <label>Shares <small>max: {shares}</small></label>
                      <input type="number" min="1" max={shares} {...field} />
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
      )}
    </>
  );
};

export default withRouter(RageQuit);
