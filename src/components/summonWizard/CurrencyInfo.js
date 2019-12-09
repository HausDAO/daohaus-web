import { Field, useFormikContext } from 'formik';
import React from 'react';

const CurrencyInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Wizard">
      <h3>Currency</h3>
      <h4>Choose a currency to accept as tribute.</h4>
      <label className="Select">
        <Field component="select" name="approvedToken">
          <option value={process.env.REACT_APP_DAI_ADDRESS}>DAI</option>
          <option value={process.env.REACT_APP_WETH_ADDRESS}>WETH</option>
        </Field>
      </label>
      <p>
        <small style={{ color: 'red' }}>
          {touched.approvedToken && errors.approvedToken}
        </small>
      </p>

      <Field name="minimumTribute">
        {({ field, form }) => (
          <div className={field.value ? 'Field HasValue' : 'Field '}>
            <label>Recommended Minimum Tribute</label>
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
      <p>
        <small style={{ color: 'red' }}>
          {touched.minimumTribute && errors.minimumTribute}
        </small>
      </p>
    </div>
  );
};

export default CurrencyInfo;
