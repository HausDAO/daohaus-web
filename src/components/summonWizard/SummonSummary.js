import { useFormikWizard } from 'formik-wizard';
import React from 'react';

function SummonSummary() {
  const { values } = useFormikWizard();

  const whitelistTokenSymbol = address => {
    if (address === process.env.REACT_APP_DAI_ADDRESS) {
      return 'DAI';
    }
    if (address === process.env.REACT_APP_WETH_ADDRESS) {
      return 'WETH';
    }
    return '' + address;
  };

  const secToDay = seconds => {
    return seconds / 86400;
  };

  const toDaysDisplay = periodLength => {
    const days = periodLength / 5;
    return days + " " + (days > 1 ? 'days' : 'day');
  };

  return (
    <div className="Summary">
      <h3>Review & Summon</h3>
      <h4>Review your dao settings. If all looks good, summon away!</h4>
      <p className="Label">Name</p>
      <p className="Value">{values.dao.name}</p>
      <p className="Label">Description</p>
      <p className="Value">{values.dao.description}</p>
      <p className="Label">Currency</p>
      <p className="Value">
        {whitelistTokenSymbol(values.currency.approvedToken)}
      </p>
      <p className="Label">Period Duration</p>
      <p className="Value">
        {secToDay(values.timing.periodDuration)} days (5 per day)
      </p>
      <p className="Label">Voting Period Length</p>
      <p className="Value">{toDaysDisplay(values.timing.votingPeriodLength)}</p>
      <p className="Label">Grace Period Length</p>
      <p className="Value">{toDaysDisplay(values.timing.gracePeriodLength)}</p>
      <p className="Label">Abort Window</p>
      <p className="Value">{toDaysDisplay(values.timing.abortWindow)}</p>
      <p className="Label">Proposal Deposit</p>
      <p className="Value">{values.deposit.proposalDeposit}</p>
      <p className="Label">Dilution Bound</p>
      <p className="Value">{values.deposit.dilutionBound}</p>
      <p className="Label">Processing Reward</p>
      <p className="Value">{values.deposit.processingReward}</p>
    </div>
  );
}

export default SummonSummary;
