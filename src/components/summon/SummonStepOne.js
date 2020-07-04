import React from 'react';

import { daoPresets } from '../../content/summon-presets';
import { formatPeriodDuration, formatPeriodLength } from '../../util/helpers';

import './Summon.scss';

const SummonStepOne = ({ daoData, setDaoData, setCurrentStep }) => {
  const selectPreset = preset => {
    setDaoData(prevState => {
      return { ...prevState, ...preset };
    });
  };

  const renderPresets = () => {
    return daoPresets.map(preset => {
      const isSelected = daoData.presetName === preset.presetName;

      if (isSelected) {
        return (
          <div
            className="SummonStepOne__card"
            style={{ backgroundColor: preset.color }}
            key={preset.presetName}
          >
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
              Prop Deposit: {`${preset.proposalDeposit} ${preset.currency}`}
            </p>
            <p>
              Prop Reward: {`${preset.processingReward} ${preset.currency}`}
            </p>
            <p>* you can change these later</p>
          </div>
        );
      } else {
        return (
          <div
            className="SummonStepOne__card"
            key={preset.presetName}
            onClick={() => selectPreset(preset)}
          >
            <h4 style={{ color: preset.color }}>{preset.presetName}</h4>
            <h5 style={{ color: preset.color }}>{preset.presetSubtitle}</h5>
            <p>{preset.presetDescription}</p>
          </div>
        );
      }
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
