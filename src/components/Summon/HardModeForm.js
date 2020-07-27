import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Context } from '../../contexts/ContractContexts';

import './Summon.scss';

const HardModeForm = ({ daoData, handleSummon }) => {
  const [w3Service] = useContext(Web3Context);

  const {
    register,
    getValues,
    errors,
    handleSubmit,
    watch,
    formState,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { ...daoData },
  });
  const { isDirty, isValid, isSubmitted } = formState;

  const versionWatch = watch('version');

  const onSubmit = data => {
    handleSummon(data);
  };

  return (
    <div className="HardModeForm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="Form"
      >
        <div>
          <h4>Name</h4>
          <p>
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
            Which Moloch Version?
            <select className="inline-field" name="version" ref={register}>
              <option value="1">Version 1</option>
              <option value="2">Version 2</option>
            </select>
          </div>
        </div>

        <div>
          <h4>Currency</h4>
          <div>
            What is the primary currency contract address?
            <input
              className="inline-field"
              name="approvedToken"
              disabled={process.env.REACT_APP_NETWORK_ID === '100'}
              ref={register({
                required: true,
                validate: {
                  isAddress: val => w3Service.web3Service.isAddress(val),
                },
              })}
            />
            {errors.approvedToken?.type === 'required' && (
              <span className="required-field">add a token address</span>
            )}
            {errors.approvedToken?.type === 'isAddress' && (
              <span className="required-field">
                that doesn't look like a token address
              </span>
            )}
            <p>
              How much should it cost to join (needs to be in wei - 18
              decimals)?
            </p>
            <input
              className="inline-field"
              name="minimumTribute"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />
            {errors.minimumTribute?.type === 'required' && (
              <span className="required-field">required</span>
            )}
          </div>
        </div>

        <div>
          <h4>Periods</h4>
          <div>
            How many seconds per period?
            <input
              className="inline-field"
              name="periodDuration"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />
            {errors.periodDuration?.type === 'required' && (
              <span className="required-field">required</span>
            )}
            {errors.periodDuration?.type === 'pattern' && (
              <span className="required-field">not a number</span>
            )}
          </div>
        </div>

        <div>
          <h4>Voting</h4>
          <p>How many periods will the voting period last?</p>
          <input
            className="inline-field"
            name="votingPeriod"
            ref={register({
              required: true,
              pattern: /^-?\d*\.?\d*$/,
            })}
          />{' '}
          {errors.votingPeriod?.type === 'required' && (
            <span className="required-field">required</span>
          )}
          {errors.votingPeriod?.type === 'pattern' && (
            <span className="required-field">not a number</span>
          )}
          <p>How many periods will the grace period last?</p>
          <input
            className="inline-field"
            name="gracePeriod"
            ref={register({
              required: true,
              pattern: /^-?\d*\.?\d*$/,
            })}
          />{' '}
          {errors.gracePeriod?.type === 'required' && (
            <span className="required-field">required</span>
          )}
          {errors.gracePeriod?.type === 'pattern' && (
            <span className="required-field">not a number</span>
          )}
          {versionWatch === '1' ? (
            <>
              <p>How many periods will the abort window last?</p>
              <input
                className="inline-field"
                name="abortWindow"
                ref={register({
                  required: true,
                  pattern: /^-?\d*\.?\d*$/,
                })}
              />
              {errors.abortWindow?.type === 'required' && (
                <span className="required-field">required</span>
              )}
              {errors.abortWindow?.type === 'pattern' && (
                <span className="required-field">not a number</span>
              )}{' '}
            </>
          ) : null}
          <p>What will be the dilution bound?</p>
          <input
            className="inline-field"
            name="dilutionBound"
            ref={register({
              required: true,
              pattern: /^-?\d*\.?\d*$/,
            })}
          />
          {errors.dilutionBound?.type === 'required' && (
            <span className="required-field">required</span>
          )}
          {errors.dilutionBound?.type === 'pattern' && (
            <span className="required-field">not a number</span>
          )}{' '}
        </div>

        <div>
          <h4>Deposits</h4>
          <p>
            How much is the proposal deposit (needs to be in wei - 18 decimals)?
            <input
              className="inline-field"
              name="proposalDeposit"
              ref={register({
                required: true,
                pattern: /^-?\d*\.?\d*$/,
              })}
            />
            {errors.proposalDeposit?.type === 'required' && (
              <span className="required-field">required</span>
            )}
            {errors.proposalDeposit?.type === 'pattern' && (
              <span className="required-field">not a number</span>
            )}{' '}
          </p>
          <p>
            How much is the processing reward (needs to be in wei - 18
            decimals)?
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
            {errors.processingReward?.type === 'lessThanDeposit' && (
              <span className="required-field">
                processing reward must be less than that proposal deposit
              </span>
            )}
            {errors.processingReward?.type === 'required' && (
              <span className="required-field">required</span>
            )}
            {errors.processingReward?.type === 'pattern' && (
              <span className="required-field">not a number</span>
            )}{' '}
          </p>
        </div>
        <div className="StepControl">
          <input
            type="submit"
            value="SUMMON"
            disabled={isSubmitted || (!isDirty && !isValid)}
            className={
              isSubmitted || (!isDirty && !isValid)
                ? 'disabled Button'
                : 'Button'
            }
          />
        </div>
      </form>
    </div>
  );
};

export default HardModeForm;
