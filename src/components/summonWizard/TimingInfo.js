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
            <p>5 per day</p>
          </div>
        )}
      </Field>
      <small style={{ color: "red" }}>
        {touched.periodDuration && errors.periodDuration}
      </small>

      <label>Voting Period Length</label>
      <Field component="select" name="votingPeriodLength">
        <option value="5">1 Day</option>
        <option value="10">2 Day</option>
        <option value="15">3 Day</option>
        <option value="25">5 Day</option>
        <option value="35">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.votingPeriodLength && errors.votingPeriodLength}
      </small>

      <label>Grace Period Length</label>
      <Field component="select" name="gracePeriodLength">
        <option value="5">1 Day</option>
        <option value="10">2 Day</option>
        <option value="15">3 Day</option>
        <option value="25">5 Day</option>
        <option value="35">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.gracePeriodLength && errors.gracePeriodLength}
      </small>

      <label>Abort Window</label>
      <Field component="select" name="abortWindow">
        <option value="5">1 Day</option>
        <option value="10">2 Day</option>
        <option value="15">3 Day</option>
        <option value="25">5 Day</option>
        <option value="35">7 Day</option>
      </Field>
      <small style={{ color: "red" }}>
        {touched.abortWindow && errors.abortWindow}
      </small>
    </div>
  );
};

export default TimingInfo;
