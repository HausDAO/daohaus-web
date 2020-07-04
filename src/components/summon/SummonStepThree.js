import React from 'react';
import { useForm } from 'react-hook-form';

import { periodsForForm, periodsFromForm } from '../../util/helpers';

import './Summon.scss';

const SummonStepThree = ({ daoData, setDaoData, setCurrentStep }) => {
  const { register, getValues, watch } = useForm({
    defaultValues: { ...daoData, formattedPeriods: periodsForForm(daoData) },
  });

  const watchPeriodFields = watch([
    'formattedPeriods.votingPeriod',
    'formattedPeriods.gracePeriod',
  ]);

  //TODO: use some watchField magic to check on valid values
  const canSummon = false;

  const navigate = step => {
    setDaoData(prevState => {
      return {
        ...prevState,
        ...getValues(),
        ...periodsFromForm(watchPeriodFields, daoData.periodDuration),
      };
    });

    if (step === 'summon') {
      alert('coming soon');
    } else {
      setCurrentStep(step);
    }
  };

  console.log('daoData', daoData);

  return (
    <div className="SummonStepThree">
      <div>
        <h4>Name</h4>
        <p>
          Our DAO is called{' '}
          <input className="inline-field" name="name" ref={register} />
        </p>
      </div>

      <div>
        <h4>Description</h4>
        <p>
          The quick description is{' '}
          <textarea
            className="inline-field"
            name="description"
            ref={register}
          />
        </p>
      </div>

      <div>
        <h4>Currency</h4>
        <p>
          Our primary currency is{' '}
          <input className="inline-field" name="currency" ref={register} />
          and it'll cost at least
          <input
            className="inline-field"
            name="minimumTribute"
            ref={register}
          />
          {daoData.currency} to join.
        </p>
      </div>

      <div>
        <h4>Voting</h4>
        <p>
          {/* TODO: DO we want to surface this in easy mode? 
          Time between proposal phases is{' '}
          <input
            className="inline-field"
            name="formattedPeriods.periodDuration"
            ref={register}
          />{' '} minutes */}
          Our voting period lasts{' '}
          <input
            className="inline-field"
            name="formattedPeriods.votingPeriod"
            ref={register}
          />{' '}
          days. and the grace period is another{' '}
          <input
            className="inline-field"
            name="formattedPeriods.gracePeriod"
            ref={register}
          />{' '}
          days.
        </p>
      </div>

      <div>
        <h4>Deposits</h4>
        <p>
          And a proposal deposit costs{' '}
          <input
            className="inline-field"
            name="proposalDeposit"
            ref={register}
          />{' '}
          {daoData.currency} and the proposal reward is{' '}
          <input
            className="inline-field"
            name="processingReward"
            ref={register}
          />{' '}
          {daoData.currency}
          <input className="inline-field" name="votingPeriod" ref={register} />
          and the grace period is another{' '}
          <input
            className="inline-field"
            name="gracePeriod"
            ref={register}
          />{' '}
        </p>
      </div>
      <div>
        <button
          onClick={() => navigate('summon')}
          disabled={!canSummon}
          className={!canSummon ? 'disabled' : ''}
        >
          SUMMON
        </button>
        <button onClick={() => navigate(2)}>GO BACK</button>
      </div>
    </div>
  );
};

export default SummonStepThree;
