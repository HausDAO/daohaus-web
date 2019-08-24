import { Field, useFormikContext } from "formik";
import React from "react";

const CurrencyInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Currency</h3>
      <h4>Choose a currency to accept as tribute.</h4>

      <Field name="approvedToken">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Approved Token</label>
            <input type="text" {...field} />
          </div>
        )}
      </Field>

      <small style={{ color: "red" }}>
        {touched.approvedToken && errors.approvedToken}
      </small>
    </div>
  );
};

export default CurrencyInfo;
