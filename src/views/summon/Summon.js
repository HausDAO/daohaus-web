import React, { useState, useContext } from 'react';

import SummonAdvForm from '../../components/summonAdvForm/SummonAdvForm';
import SummonWizard from '../../components/summonWizard/SummonWizard';
import SummonAdvV2Form from '../../components/summonAdvV2Form/SummonAdvV2Form';
import SummonWizardV2 from '../../components/summonWizardV2/SummonWizardV2';

import './Summon.scss';
import { Web3Context } from '../../contexts/ContractContexts';

const Summon = () => {
  const [web3context] = useContext(Web3Context);

  const [wizardForm, setWizardForm] = useState(true);
  const [v2Form, setV2Form] = useState(false);
  const [v2Wizard, setV2Wizard] = useState(false);

  const toggleForm = () => {
    setWizardForm(!wizardForm);
  };

  const toggleV2 = () => {
    setV2Form(!v2Form);
  };

  const toggleV2Wizard = () => {
    setV2Wizard(!v2Wizard);
  };

  return (
    <>
      {web3context.account ? (
        <div className="View SmallContainer">
          <div className="Row">
            <p>{wizardForm ? 'Summon (Easy Mode)' : 'Summon (Hard Mode)'}</p>
            <button className="TabButton" onClick={toggleForm}>
              {wizardForm ? 'Hard Mode' : 'Easy Mode'}
            </button>
          </div>
          {wizardForm ? (
            <>
              <h3>{v2Wizard ? 'Summon Moloch V2' : 'Summon Moloch V1'}</h3>

              <button className="TabButton Switch" onClick={toggleV2Wizard}>
                Switch to {v2Wizard ? 'Moloch V1' : 'Moloch V2'}
              </button>
              {v2Wizard ? (
                <SummonWizardV2></SummonWizardV2>
              ) : (
                <SummonWizard></SummonWizard>
              )}
            </>
          ) : (
            <div className="SummonForm">
              <h3>{v2Form ? 'Summon Moloch V2' : 'Summon Moloch V1'}</h3>

              <button className="TabButton Switch" onClick={toggleV2}>
                Switch to {v2Form ? 'Moloch V1' : 'Moloch V2'}
              </button>

              {v2Form ? (
                <SummonAdvV2Form></SummonAdvV2Form>
              ) : (
                <SummonAdvForm></SummonAdvForm>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Summon;
