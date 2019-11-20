import { useFormikWizard } from "formik-wizard";
import React from "react";

function SummonSummary() {
  const { values } = useFormikWizard();

  return (
    <div>
      <h3>Summon your DAO!</h3>
      <p>Does this look right?</p>
      <p className="Label">Name</p>
      <p className="Value">{values.dao.name}</p>
      <p className="Label">Description</p><p className="Value">{values.dao.description}</p>
      <p className="Label">Currency</p><p className="Value">{values.currency.approvedToken}</p>
      <p className="Label">Period Duration</p><p className="Value">{values.timing.periodDuration}</p>
      <p className="Label">Voting Period Length</p><p className="Value">{values.timing.votingPeriodLength}</p>
      <p className="Label">Grace Period Length</p><p className="Value">{values.timing.gracePeriodLength}</p>
      <p className="Label">Abort Window</p><p className="Value">{values.timing.abortWindow}</p>
      <p className="Label">Proposal Deposit</p><p className="Value">{values.deposit.proposalDeposit}</p>
      <p className="Label">Dilution Bound</p><p className="Value">{values.deposit.dilutionBound}</p>
      <p className="Label">Processing Reward</p><p className="Value">{values.deposit.processingReward}</p>
    </div>
  );
}

export default SummonSummary;
