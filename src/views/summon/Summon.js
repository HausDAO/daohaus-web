import React, { useState } from "react";
import { useWeb3Context } from "web3-react";

import SummonAdvForm from "../../components/summonAdvForm/SummonAdvForm";
import SummonWizard from "../../components/summonWizard/SummonWizard";
import SummonAdvV2Form from "../../components/summonAdvV2Form/SummonAdvV2Form";

const Summon = () => {
  const context = useWeb3Context();
  const [wizardForm, setWizardForm] = useState(true);
  const [v2Form, setV2Form] = useState(true);

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
            <button className="TabButton" onClick={toggleForm}>
              {wizardForm ? "Hard Mode" : "Easy Mode"}
            </button>
            <p>{wizardForm ? "Summon (Easy Mode)" : "Summon (Hard Mode)"}</p>
          </div>
          {wizardForm ? (
            <SummonWizard></SummonWizard>
          ) : (
              <div>
                <p>{v2Form ? "Version 2" : "Version 1"}</p>

                <button className="TabButton" onClick={toggleV2}>
                  Switch to {v2Form ? "Version 1" : "Version 2"}
                </button>

                {v2Form ? (<SummonAdvV2Form></SummonAdvV2Form>) : (<SummonAdvForm></SummonAdvForm>)}

              </div>
            )}
        </div>
      ) : null}
    </>
  );
};

export default Summon;
