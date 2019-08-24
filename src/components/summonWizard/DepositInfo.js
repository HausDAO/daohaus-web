import { Field, useFormikContext } from "formik";
import React from "react";

const DepositInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Desposit Info</h3>
      <h4>This is the confusing part.</h4>

      <Field name="proposalDeposit">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Proposal Deposit</label>
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

      <small style={{ color: "red" }}>
        {touched.proposalDeposit && errors.proposalDeposit}
      </small>

      <Field name="dilutionBound">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Dilution Bound</label>
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

      <small style={{ color: "red" }}>
        {touched.dilutionBound && errors.dilutionBound}
      </small>

      <Field name="processingReward">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Processing Reward</label>
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

      <small style={{ color: "red" }}>
        {touched.processingReward && errors.processingReward}
      </small>
    </div>
  );
};

export default DepositInfo;
