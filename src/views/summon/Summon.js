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
          <button className="TabButton" onClick={toggleForm}>
            {wizardForm ? "Hard Mode" : "Use Wizard"}
          </button>
          {wizardForm ? (
            <SummonWizard></SummonWizard>
          ) : (
            <SummonAdvForm></SummonAdvForm>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Summon;
