import { Field, useFormikContext } from "formik";
import React from "react";

import { tokenToAddress } from "../../util/constants";

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
        <option value={tokenToAddress.Dai}>DAI</option>
        <option value={tokenToAddress.Weth}>WETH</option>
      </Field>
      </div>

      <p><small style={{ color: "red" }}>
        {touched.approvedToken && errors.approvedToken}
      </small>
      </p>
    </div>
  );
};

export default CurrencyInfo;
