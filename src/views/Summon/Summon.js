import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { daoConstants } from '../../content/summon-presets';
import { SummonContext } from '../../contexts/SummonContext';
import { Web3Context } from '../../contexts/ContractContexts';
import SummonStepOne from '../../components/Summon/SummonStepOne';
import HardModeForm from '../../components/Summon/HardModeForm';
import SummonStepTwo from '../../components/Summon/SummonStepTwo';
import SummonStepThree from '../../components/Summon/SummonStepThree';
import BoostPackages from '../../components/Boosts/BoostPackages';
import MiniLoader from '../../components/Shared/Loading/MiniLoader';

import './Summon.scss';

const Summon = props => {
  const [web3context] = useContext(Web3Context);
  const [hardMode, setHardMode] = useState(false);
  const [daoData, setDaoData] = useState(daoConstants());
  const [isSummoning, setIsSummoning] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { state, dispatch } = useContext(SummonContext);

  const stepContent = {
    1: 'What kind of Haus will you build?',
    2: 'Give us the basics',
    3: 'Last chance to make changes',
    4: 'Our magic internet communities take a minute or two to create.',
  };

  const handleSummon = async data => {
    setCurrentStep(4);
    setIsSummoning(true);

    setDaoData(prevState => {
      return {
        ...prevState,
        ...data,
        summon: true,
      };
    });
  };

  useEffect(() => {
    const summonDao = async () => {
      console.log('summoning HERE', daoData);
      await state.service.summonDao(daoData, web3context.account, dispatch);
    };

    if (daoData.summon) {
      summonDao();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daoData]);

  useEffect(() => {
    if (state.status === 'error') {
      setIsSummoning(false);
      setCurrentStep(3);
    }

    if (state.status === 'complete') {
      dispatch({ type: 'clearState' });
      props.history.push(
        `/building-dao/v${
          daoData.version
        }/${state.contractAddress.toLowerCase()}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      {web3context && web3context.account ? (
        <>
          <div className="Summon__hero">
            <h1>SUMMON</h1>
          </div>

          <div className="View Summon">
            <div className="Row">
              <div className="Summon__step">
                {currentStep > 4 ? <h3>Step {currentStep}</h3> : null}
                <p>{stepContent[currentStep]}</p>
              </div>
              {currentStep > 4 ? <button>Get Help</button> : null}
            </div>

            {state.status === 'error' ? (
              <h1>{state.errorMessage.message || state.errorMessage}</h1>
            ) : null}

            {!isSummoning ? (
              <>
                {!hardMode ? (
                  <>
                    {currentStep === 1 ? (
                      <SummonStepOne
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 2 ? (
                      <SummonStepTwo
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 3 ? (
                      <SummonStepThree
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                        handleSummon={handleSummon}
                      />
                    ) : null}

                    {currentStep === 1 ? (
                      <div className="ModeSwitch">
                        <p style={{ width: '100%', textAlign: 'center' }}>
                          I'm a DAO master, take me to{' '}
                          <span
                            className="mode-link"
                            onClick={() => setHardMode(true)}
                          >
                            Hard Mode
                          </span>
                        </p>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <HardModeForm
                      daoData={daoData}
                      setDaoData={setDaoData}
                      handleSummon={handleSummon}
                    />
                    <div className="ModeSwitch">
                      <p style={{ width: '100%', textAlign: 'center' }}>
                        Take me back to{' '}
                        <span
                          className="mode-link"
                          onClick={() => setHardMode(false)}
                        >
                          Fun Mode.
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <MiniLoader txHash={state.summonTx} />
                <p>While you wait, check out our boosts</p>
                <BoostPackages isSummoning={isSummoning} />
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default withRouter(Summon);
