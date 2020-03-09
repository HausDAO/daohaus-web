import { Field, useFormikContext } from "formik";
import React from "react";

const TimingInfo = () => {
  const { errors, touched } = useFormikContext();

  return (
    <div>
      <h3>Proposal Timing</h3>
      <h4>Larger daos typically have a 7 day Voting period and a 7 day Grace, meaning 14 days total for a proposal to complete. Smaller daos can move faster like 3 Days Voting and 2 Days Grace, meaning 5 days for a proposal to complete.</h4>

      <Field name="periodDuration">
        {({ field, form }) => (
          <div className={field.value ? "Field HasValue" : "Field "}>
            <label>Proposal Period Duration</label>
            <p>12 per day</p>
          </div>
        )}
      </Field>
      <small style={{ color: "red" }}>
        {touched.periodDuration && errors.periodDuration}
      </small>

      <label className="Select">Voting Period Length
        <Field component="select" name="votingPeriodLength">
          <option value="12">1 Day</option>
          <option value="24">2 Day</option>
          <option value="36">3 Day</option>
          <option value="60">5 Day</option>
          <option value="84">7 Day</option>
        </Field>
      </label>
      <small style={{ color: "red" }}>
        {touched.votingPeriodLength && errors.votingPeriodLength}
      </small>

      <label className="Select">Grace Period Length
        <Field component="select" name="gracePeriodLength">
          <option value="12">1 Day</option>
          <option value="24">2 Day</option>
          <option value="36">3 Day</option>
          <option value="60">5 Day</option>
          <option value="84">7 Day</option>
        </Field>
      </label>
      <small style={{ color: "red" }}>
        {touched.gracePeriodLength && errors.gracePeriodLength}
      </small>

    </div>
  );
};

export default TimingInfo;
