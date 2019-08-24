import React, {useState} from "react";
import { useWeb3Context } from 'web3-react'
import { Formik, Form, Field, ErrorMessage } from "formik";

import { post } from '../../util/requests';

import Loading from '../loading/Loading';

// import Web3Service from '../../util/web3Service';

const ApplicationForm = (props) => {
  const { contractAddress } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const context = useWeb3Context();

  return (
    <>
      {loading && <Loading />}

      {!context.account ? (
        <p>Please connect with MetaMask</p>
      ) : (
        <>
      <h2>Application Form</h2>

        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : null}

      <Formik
        initialValues={{
          name: "",
          bio: "",
          tribute: "",
        }}
        validate={values => {
          let errors = {};
          if (!values.tribute) {
            errors.tribute = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // const web3Service = new Web3Service();
          // make web3 contract call
          // make get to create 
          setLoading(true);

          try {
            const application = {
              name: values.name,
              bio: values.bio,
              tribute: values.tribute,
              applicantAddress: context.account,
              molochContractAddress: contractAddress
            }
            const res = await post(`moloch/apply`, application);

            if (res.data.error) {
              setErrorMessage(res.data.error)
            }

            setSubmitting(false);
            return false;

          } catch (err) {
            console.log(err);
            alert(`Something went wrong. please try again`);
          }

          resetForm();
          setLoading(false);
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

            <Field name="bio">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>bio</label>
                  <textarea {...field} />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="bio"
              render={msg => <div className="Error">{msg}</div>}
            />

            <Field name="tribute">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
                  <label>Tribute</label>
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
              name="tribute"
              render={msg => <div className="Error">{msg}</div>}
            />

            <button type="submit" disabled={isSubmitting}>
              Apply
            </button>
          </Form>
        )}
      </Formik>
      </>
      )}
    </>
  );
};

export default ApplicationForm;
