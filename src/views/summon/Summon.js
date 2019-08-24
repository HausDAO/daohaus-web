import React, { useState } from "react";
import { useWeb3Context } from "web3-react";

import SummonAdvForm from "../../components/summonAdvForm/SummonAdvForm";
import SummonWizard from "../../components/summonWizard/SummonWizard";

const Summon = () => {
  const context = useWeb3Context();
  const [wizardForm, setWizardForm] = useState(true);

  const toggleForm = () => {
    setWizardForm(!wizardForm);
  };

  return (
    <>
      {context.account ? (
        <div className="Form">
          {wizardForm ? (
            <SummonWizard></SummonWizard>
          ) : (
            <SummonAdvForm></SummonAdvForm>
          )}

          <button onClick={toggleForm}>
            {wizardForm ? "Use Advanced Form" : "Use Wizard"}
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Summon;
