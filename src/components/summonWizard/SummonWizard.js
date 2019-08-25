import React from "react";
import { withRouter } from "react-router-dom";
import { FormikWizard } from "formik-wizard";

import { useWeb3Context } from "web3-react";
import Web3Service from "../../util/web3Service";
import DaoAbi from "../../contracts/moloch.json";
import DaoByteCode from "../../contracts/molochByteCode.json";
import { post } from "../../util/requests";
import summonSteps from "./SummonSteps";

function FormWrapper({
  children,
  isLastStep,
  status,
  goToPreviousStep,
  canGoBack,
  actionLabel
}) {
  return (
    <div className="Wizard">
      {children}
      {status && (
        <div className="Status">
          {status.message}
        </div>
      )}
      <div className="ButtonGroup">
        <button type="button" onClick={goToPreviousStep} disabled={!canGoBack}>
          Previous
        </button>
        <button type="submit">
          {actionLabel || (isLastStep ? "Summon!" : "Next step")}
        </button>
      </div>
    </div>
  );
}

const SummonWizard = props => {
  const context = useWeb3Context();

  const handleSubmit = async values => {
    console.log(values);

    const web3Service = new Web3Service();

    try {
      const daoContract = await web3Service.createContract(DaoAbi);
      const deployedContract = await daoContract.deploy({
        data: DaoByteCode.object,
        arguments: [
          context.account,
          values.approvedToken,
          values.periodDuration,
          values.votingPeriodLength,
          values.gracePeriodLength,
          values.abortWindow,
          values.proposalDeposit,
          values.dilutionBound,
          values.processingReward
        ]
      });

      console.log("deployedContract", deployedContract);

      deployedContract
        .send(
          {
            from: context.account
          },
          function(error, transactionHash) {
            console.log(error, transactionHash);
          }
        )
        .on("error", function(error) {
          console.log(error);
        })
        .on("transactionHash", function(transactionHash) {
          console.log(transactionHash);
        })
        .on("receipt", function(receipt) {
          console.log(receipt.contractAddress); // contains the new contract address
          const newMoloch = {
            summonerAddress: context.account,
            contractAddress: receipt.contractAddress,
            name: values.name,
            minumumTribute: values.minumumTribute,
            description: values.description
          };

          post("moloch", newMoloch)
            .then(newMolochRes => {
              console.log("created new moloch", newMolochRes);

              props.history.push(`/moloch/${receipt.contractAddress}`);
            })
            .catch(err => {
              console.log("moloch creation error", err);
            });
        })
        .on("confirmation", function(confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .then(function(newContractInstance) {
          console.log(newContractInstance.options.address); // instance with the new contract address
        });
    } catch (err) {
      console.log(err);
      alert(`Something went wrong. please try again`);
    }
  };

  return (
    <>
      {context.account ? (
        <FormikWizard
          steps={summonSteps}
          onSubmit={handleSubmit}
          render={FormWrapper}
        />
      ) : (
        <p>Connect your metamask account</p>
      )}
    </>
  );
};

export default withRouter(SummonWizard);
