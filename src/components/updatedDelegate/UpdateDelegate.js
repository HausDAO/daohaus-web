import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useWeb3Context } from "web3-react";
import MolochService from "../../util/molochService";

// import Loading from '../shared/Loading';

const UpdateDelegate = ({ contractAddress }) => {
  const context = useWeb3Context();

  return (
    <>
      {/* {loading && <Loading />} */}

      <h2>Update Delegate Form</h2>
      <Formik
        initialValues={{
          address: "",
        }}
        validate={values => {
          let errors = {};
          if (!values.address) {
            errors.address = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const daoService = new MolochService(contractAddress)

          const daoContract = await daoService.initContract();
          console.log('daoContract', daoContract);
          
          // setLoading(true);
          try {
            
            await daoContract.methods
            .updateDelegateKey(
              values.address
            )
            .send({ from: context.account })
            .once("transactionHash", txHash => {})
            .on("receipt", async (receipt) => {
              console.log('receipt', receipt); 
            })
            .then(resp => {
              return resp;
            })
            .catch(err => {
              //setLoading(false);
              console.log(err);
              return { error: "rejected transaction" };
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
            <Field name="address">
              {({ field, form }) => (
                <div className={field.value ? "Field HasValue" : "Field "}>
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
    </>
  );
};

export default UpdateDelegate;
