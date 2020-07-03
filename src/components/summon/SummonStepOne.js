import React from 'react';

import { daoPresets } from '../../content/summon-content';

import './Summon.scss';

const SummonStepOne = ({ daoData, setDaoData, setCurrentStep }) => {
  const selectPreset = preset => {
    console.log('setting preset', preset);
    setDaoData(prevState => {
      return { ...prevState, preset: preset };
    });
  };

  const renderPresets = () => {
    return daoPresets.map(preset => {
      const isSelected = daoData.preset && daoData.preset.name === preset.name;

      if (isSelected) {
        return (
          <div
            className="SummonStepOne__card"
            style={{ backgroundColor: preset.color }}
            key={preset.name}
          >
            <h4>{preset.name}</h4>
            <h5>Default Settings</h5>
            <p>Currency: {preset.currency}</p>
            <p>Min Tribute: {preset.minTribute}</p>
            <p>Voting Period: {preset.votingPeriod}</p>
            <p>Grace Period: {preset.gracePeriod}</p>
            <p>Prop Deposit: {preset.propDeposit}</p>
            <p>Prop Reward: {preset.propReward}</p>
            <p>* you can change these later</p>
          </div>
        );
      } else {
        return (
          <div
            className="SummonStepOne__card"
            key={preset.name}
            onClick={() => selectPreset(preset)}
          >
            <h4 style={{ color: preset.color }}>{preset.name}</h4>
            <h5 style={{ color: preset.color }}>{preset.subtitle}</h5>
            <p>{preset.description}</p>
          </div>
        );
      }
    });
  };
  return (
    <div className="SummonStepOne">
      <div className="SummonStepOne__list">{renderPresets()}</div>
      {daoData.preset ? <button>NEXT STEP</button> : null}
    </div>
  );
};

export default SummonStepOne;
