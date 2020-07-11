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
      className={preset.isSelected ? 'PresetCard isSelected' : 'PresetCard'}
      key={preset.presetName}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
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
          <p>Currency: {preset.currency}</p>
          <p>Min Tribute: {`${preset.minimumTribute} ${preset.currency}`}</p>
          <p>Period Duration: {formatPeriodDuration(preset.periodDuration)}</p>
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
            {`${formatDepositWei(preset.processingReward)} ${preset.currency}`}
          </p>
          <p>* You can change these later</p>
        </div>
      </div>
    </div>
  );
};

export default PresetCard;
