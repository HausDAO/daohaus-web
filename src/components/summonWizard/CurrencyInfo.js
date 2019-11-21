import { Field, useFormikContext } from "formik";
import React from "react";


const CurrencyInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div className="Wizard">
      <h3>Currency</h3>
      <h4>Choose a currency to accept as tribute.</h4>
      <div className="Select">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>

      <Field component="select" name="approvedToken">
        <option value={'0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'}>DAI</option>
        <option value={'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'}>WETH</option>
      </Field>
      </div>

      <p><small style={{ color: "red" }}>
        {touched.approvedToken && errors.approvedToken}
      </small>
      </p>

      <Field name="minimumTribute">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Minimum Tribute</label>
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
      <p><small style={{ color: "red" }}>
        {touched.minimumTribute && errors.minimumTribute}
      </small>
      </p>
    </div>
  );
};

export default CurrencyInfo;
