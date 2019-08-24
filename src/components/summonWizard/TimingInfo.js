import { Field, useFormikContext } from "formik";
import React from "react";

const TimingInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Proposal Timing</h3>
      <h4>Proposals</h4>

      <Field name="periodDuration">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Period Duration</label>
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
        {touched.periodDuration && errors.periodDuration}
      </small>

      <Field name="votingPeriodLength">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Voting Period Length</label>
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
        {touched.votingPeriodLength && errors.votingPeriodLength}
      </small>

      <Field name="gracePeriodLength">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Grace Period Length</label>
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
        {touched.gracePeriodLength && errors.gracePeriodLength}
      </small>

      <Field name="abortWindow">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Abort Window</label>
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
        {touched.abortWindow && errors.abortWindow}
      </small>
    </div>
  );
};

export default TimingInfo;
