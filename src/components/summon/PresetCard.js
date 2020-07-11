import React, { useState } from 'react';

import {
  formatPeriodDuration,
  formatPeriodLength,
  formatDepositWei,
} from '../../util/helpers';

import './Summon.scss';

const PresetCard = ({ preset, selectPreset, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={isSelected ? 'PresetCard isSelected' : 'PresetCard'}
      key={preset.presetName}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => selectPreset(preset)}
    >
      <div className="PresetCard__Inner">
        <div className="PresetCard__Front">
          <img src={preset.img} alt="daohaus" />
          <h4 style={{ color: preset.color }}>{preset.presetName}</h4>
          <h5 style={{ color: preset.color }}>{preset.presetSubtitle}</h5>
          <p>{preset.presetDescription}</p>
        </div>
        <div className="PresetCard__Back">
          <h4 style={{ color: preset.color }}>{preset.presetName}</h4>
          <h5 style={{ color: preset.color }}>Default Settings</h5>
          <p>
            Currency: <strong>{preset.currency}</strong>
          </p>
          <p>
            Min Tribute:{' '}
            <strong>{`${preset.minimumTribute} ${preset.currency}`}</strong>
          </p>
          <p>
            Period Duration:{' '}
            <strong>{formatPeriodDuration(preset.periodDuration)}</strong>
          </p>
          <p>
            Voting Period:{' '}
            <strong>
              {formatPeriodLength(preset.votingPeriod, preset.periodDuration)}
            </strong>
          </p>
          <p>
            Grace Period:{' '}
            <strong>
              {formatPeriodLength(preset.gracePeriod, preset.periodDuration)}
            </strong>
          </p>
          <p>
            Prop Deposit:{' '}
            <strong>{`${formatDepositWei(preset.proposalDeposit)} ${
              preset.currency
            }`}</strong>
          </p>
          <p>
            Prop Reward:{' '}
            <strong>{`${formatDepositWei(preset.processingReward)} ${
              preset.currency
            }`}</strong>
          </p>
          <p>* You can change these later</p>
        </div>
      </div>
    </div>
  );
};

export default PresetCard;
