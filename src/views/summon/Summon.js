import React, { useState } from 'react';
import { useWeb3Context } from 'web3-react';

import SummonAdvForm from '../../components/summonAdvForm/SummonAdvForm';
import SummonWizard from '../../components/summonWizard/SummonWizard';
import SummonAdvV2Form from '../../components/summonAdvV2Form/SummonAdvV2Form';
import './Summon.scss';

const Summon = () => {
  const context = useWeb3Context();
  const [wizardForm, setWizardForm] = useState(true);
  const [v2Form, setV2Form] = useState(false);

  const toggleForm = () => {
    setWizardForm(!wizardForm);
  };

  const toggleV2 = () => {
    setV2Form(!v2Form);
  };

  return (
    <>
      {context.account ? (
        <div className="View SmallContainer">
          <div className="Row">
            <p>{wizardForm ? 'Summon (Easy Mode)' : 'Summon (Hard Mode)'}</p>
            <button className="TabButton" onClick={toggleForm}>
              {wizardForm ? 'Hard Mode' : 'Easy Mode'}
            </button>
          </div>
          {wizardForm ? (
            <SummonWizard></SummonWizard>
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
