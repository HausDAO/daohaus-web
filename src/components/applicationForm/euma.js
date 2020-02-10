import { Field, useFormikContext } from 'formik';
import React from 'react';
import EumaDoc from './eumaDoc';

function Euma() {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Step">
      <div>
        <h3>EUMA</h3>
        <p>To pledge, please review the EUMA and click to accept its terms.</p>
        <EumaDoc />
        <label>
          I accept
          <Field
            name="eumaChecked"
            render={({ field, form }) => {
              console.log('in render', field);
              console.log(' errors', errors);
              return <input {...field} type="checkbox" checked={field.value} />;
            }}
          />
        </label>
      </div>
      {!touched.eumaChecked || errors.eumaChecked ? (
        <small style={{ color: 'red' }}>
          Please accept the EUMA to continue
        </small>
      ) : null}
    </div>
  );
}

export default Euma;
