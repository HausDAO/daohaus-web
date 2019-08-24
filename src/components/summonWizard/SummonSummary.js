import { useFormikWizard } from "formik-wizard";
import React from "react";

function SummonSummary() {
  const { values } = useFormikWizard();

  return (
    <div>
      <p>Is this your DAO?</p>
      <p>Name: {values.dao.name}</p>
      <p>Description: {values.dao.bio}</p>
      <p>Currency: {values.currency.approvedToken}</p>
      <p>Period Duration: {values.timing.periodDuration}</p>
      <p>votingPeriodLength: {values.timing.votingPeriodLength}</p>
      <p>gracePeriodLength: {values.timing.gracePeriodLength}</p>
      <p>abortWindow: {values.timing.abortWindow}</p>
      <p>proposalDeposit: {values.deposit.proposalDeposit}</p>
      <p>dilutionBound: {values.deposit.dilutionBound}</p>
      <p>processingReward: {values.deposit.processingReward}</p>
    </div>
  );
}

export default SummonSummary;
