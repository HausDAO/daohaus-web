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
              disabled="true"
              {...field}
            />
          </div>
        )}
      </Field>
      <small style={{ color: "red" }}>
        {touched.periodDuration && errors.periodDuration}
      </small>

      <label>Voting Period Length</label>
      <Field component="select" name="votingPeriodLength">
        <option value="1">1 Day</option>
        <option value="3">3 Day</option>
        <option value="5">5 Day</option>
        <option value="7">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.votingPeriodLength && errors.votingPeriodLength}
      </small>

      <label>Grace Period Length</label>
      <Field component="select" name="gracePeriodLength">
        <option value="1">1 Day</option>
        <option value="3">3 Day</option>
        <option value="5">5 Day</option>
        <option value="7">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.gracePeriodLength && errors.gracePeriodLength}
      </small>

      <label>Abort Window</label>
      <Field component="select" name="abortWindow">
        <option value="1">1 Day</option>
        <option value="3">3 Day</option>
        <option value="5">5 Day</option>
        <option value="7">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.abortWindow && errors.abortWindow}
      </small>
    </div>
  );
};

export default TimingInfo;
