import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Context } from '../../contexts/ContractContexts';

import './Summon.scss';

const HardModeForm = ({ daoData, setDaoData, handleSummon }) => {
  const [w3Service] = useContext(Web3Context);

  const { register, getValues, errors, handleSubmit } = useForm({
    defaultValues: { ...daoData },
  });

  const onSubmit = data => {
    setDaoData(prevState => {
      return {
        ...prevState,
        ...data,
      };
    });

    handleSummon();
  };

  return (
    <div className="HardModeForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4>Name</h4>
          <p>
            Our DAO is called{' '}
            <input
              className="inline-field"
              name="name"
              ref={register({
                required: true,
              })}
            />
            {errors.name?.type === 'required' && (
              <span className="required-field">daos need names</span>
            )}
          </p>
        </div>

        <div>
          <h4>Description</h4>
          <p>
            The quick description is{' '}
            <textarea
              className="inline-field"
              name="description"
              ref={register({
                required: true,
              })}
            />
            {errors.description?.type === 'required' && (
              <span className="required-field">daos need descriptions</span>
            )}
          </p>
        </div>

        <div>
          <h4>Moloch Version</h4>
          <div>
            We want to use a Moloch{' '}
            <select className="inline-field" name="version" ref={register}>
              <option value="1">Version 1</option>
              <option value="2">Version 2</option>
            </select>
          </div>
        </div>

        <div>
          <h4>Currency</h4>
          <div>
            Our primary currency is{' '}
            <input
              className="inline-field"
              name="currencyAddress"
              ref={register({
                required: true,
                validate: {
                  isAddress: val => w3Service.web3Service.isAddress(val),
                },
              })}
            />
            and it'll cost at least
            <input
              className="inline-field"
              name="minimumTribute"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />
            (18 decimals) to join...
          </div>
        </div>

        <div>
          <h4>Periods</h4>
          <div>
            A period lasts{' '}
            <input
              className="inline-field"
              name="periodDuration"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />
            seconds...
          </div>
        </div>

        <div>
          <h4>Voting</h4>
          <p>
            Our voting period lasts{' '}
            <input
              className="inline-field"
              name="votingPeriod"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />{' '}
            periods, the grace period is another{' '}
            <input
              className="inline-field"
              name="gracePeriod"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />{' '}
            periods, and the abort window is{' '}
            <input
              className="inline-field"
              name="abortWindow"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />{' '}
            periods.
          </p>
        </div>

        <div>
          <h4>Deposits</h4>
          <p>
            And a proposal deposit costs{' '}
            <input
              className="inline-field"
              name="proposalDeposit"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />{' '}
            (18 decimals) and the proposal reward is{' '}
            <input
              className="inline-field"
              name="processingReward"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
                validate: {
                  lessThanDeposit: val =>
                    val.length <= getValues('proposalDeposit').length,
                },
              })}
            />{' '}
            (18 decimals)
          </p>
        </div>
        <div>
          <input type="submit" value="SUMMON" />
        </div>
      </form>
    </div>
  );
};

export default HardModeForm;
