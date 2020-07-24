import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import Loading from '../Shared/Loading/Loading';
import { Web3Context } from '../../contexts/ContractContexts';

const RageQuit = props => {
  const {
    contract,
    contractAddress,
    setComplete,
    history,
    memberData,
    account,
  } = props;

  const [web3Context] = useContext(Web3Context);

  const [formError, setformError] = useState('');
  const [txHash, settxHash] = useState('');
  const [loading, setLoading] = useState(false);

  let activeMember = memberData.active.find(
    member => member.id.indexOf(account) > -1,
  );

  console.log('activeMember', activeMember);

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
              if (activeMember && values.amount > activeMember.shares) {
                errors.amount = 'Can not rage more that you have';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setLoading(true);

              try {
                await contract.methods
                  .ragequit(values.amount)
                  .send({ from: web3Context.account })
                  .once('transactionHash', txHash => {
                    console.log('txHash', txHash);
                    settxHash(txHash);
                  })
                  .on('receipt', async receipt => {
                    console.log('receipt', receipt);

                    setLoading(false);
                    history.push(
                      `/dao/v1/${contractAddress}?successMessage=rage`,
                    );
                    setComplete(false);
                  })
                  .then(resp => {
                    return resp;
                  })
                  .catch(err => {
                    setLoading(false);
                    console.log('err', err);

                    if (err.code === 4001) {
                      setformError(
                        `Approval rejected by user. Please try again.`,
                      );
                      return { error: err };
                    }
                    if (
                      err &&
                      err.isArray() &&
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
                      <label>
                        Shares{' '}
                        <small>
                          max: {activeMember && activeMember.shares}
                        </small>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={(activeMember && activeMember.shares) || 100000}
                        {...field}
                      />
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
