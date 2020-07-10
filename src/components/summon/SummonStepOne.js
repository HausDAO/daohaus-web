import React, { useState } from 'react';

import { daoPresets } from '../../content/summon-presets';
import {
  formatPeriodDuration,
  formatPeriodLength,
  formatDepositWei,
} from '../../util/helpers';

import './Summon.scss';

const SummonStepOne = ({ daoData, setDaoData, setCurrentStep }) => {
  const selectPreset = preset => {
    setDaoData(prevState => {
      return { ...prevState, ...preset };
    });
  };
  const [isFlipped, setIsFlipped] = useState(false);

  const renderPresets = () => {
    return daoPresets.map(preset => {
      const isSelected = daoData.presetName === preset.presetName;
      return (
        <div
          className={
            isFlipped ? 'SummonStepOne__card isFlipped' : 'SummonStepOne__card'
          }
          key={preset.presetName}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          onClick={() => selectPreset(preset)}
        >
          <div className="Back">
            <h4>{preset.presetName}</h4>
            <h5>Default Settings</h5>
            <p>Currency: {preset.currency}</p>
            <p>Min Tribute: {`${preset.minimumTribute} ${preset.currency}`}</p>
            <p>
              Period Duration: {formatPeriodDuration(preset.periodDuration)}
            </p>
            <p>
              Voting Period:{' '}
              {formatPeriodLength(preset.votingPeriod, preset.periodDuration)}
            </p>
            <p>
              Grace Period:{' '}
              {formatPeriodLength(preset.gracePeriod, preset.periodDuration)}
            </p>
            <p>
              Prop Deposit:{' '}
              {`${formatDepositWei(preset.proposalDeposit)} ${preset.currency}`}
            </p>
            <p>
              Prop Reward:{' '}
              {`${formatDepositWei(preset.processingReward)} ${
                preset.currency
              }`}
            </p>
            <p>* You can change these later</p>
          </div>
          <div className="Front">
            <img src={preset.img} />
            <h4 style={{ color: preset.color }}>{preset.presetName}</h4>
            <h5 style={{ color: preset.color }}>{preset.presetSubtitle}</h5>
            <p>{preset.presetDescription}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="SummonStepOne">
      <div className="SummonStepOne__list">{renderPresets()}</div>
      <button
        onClick={() => setCurrentStep(2)}
        disabled={!daoData.presetName}
        className={!daoData.presetName ? 'disabled' : ''}
      >
        NEXT STEP
      </button>
    </div>
  );
};

export default SummonStepOne;
