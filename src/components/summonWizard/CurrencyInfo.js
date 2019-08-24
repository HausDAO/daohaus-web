import { Field, useFormikContext } from "formik";
import React from "react";

import { tokenToAddress } from "../../util/constants";

const CurrencyInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Currency</h3>
      <h4>Choose a currency to accept as tribute.</h4>

      <Field component="select" name="approvedToken">
        <option value={tokenToAddress.Dai}>DAI</option>
        <option value={tokenToAddress.Weth}>WETH</option>
      </Field>

      <small style={{ color: "red" }}>
        {touched.approvedToken && errors.approvedToken}
      </small>
    </div>
  );
};

export default CurrencyInfo;
