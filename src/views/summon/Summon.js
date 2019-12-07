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
        <div className="View SmallContainer">
          <div className="Row">
          <p>{wizardForm ? "Summon (Easy Mode)" : "Summon (Hard Mode)"}</p>
          <button className="TabButton" onClick={toggleForm}>
            {wizardForm ? "Hard Mode" : "Easy Mode"}
          </button>
          </div>
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
