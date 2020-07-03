import React, { useState, useContext } from 'react';

import { Web3Context } from '../../contexts/ContractContexts';
import { stepContent } from '../../content/summon-content';
import SummonStepOne from '../../components/summon/SummonStepOne';
import HardModeForm from '../../components/summon/HardModeForm';
import SummonStepTwo from '../../components/summon/SummonStepTwo';
import SummonStepThree from '../../components/summon/SummonStepThree';

import './Summon.scss';

const Summon = () => {
  const [web3context] = useContext(Web3Context);
  const [hardMode, setHardMode] = useState(false);
  const [daoData, setDaoData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {web3context && web3context.account ? (
        <>
          <div className="Summon__hero">
            <h1>SUMMON</h1>
          </div>

          <div className="View">
            <div className="Row">
              <div className="Summon__step">
                <h3>Step {currentStep}</h3>
                <p>{stepContent[currentStep]}</p>
              </div>
              <button>Get Help</button>
            </div>

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
                  />
                ) : null}

                <p onClick={() => setHardMode(true)}>
                  I'm a DAO master, take me to hard mode.
                </p>
              </>
            ) : (
              <>
                <HardModeForm daoData={daoData} setDaoData={setDaoData} />
                <p onClick={() => setHardMode(false)}>
                  Take me back to fun mode!
                </p>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Summon;
