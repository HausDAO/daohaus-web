import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { FormikWizard } from "formik-wizard";

import { useWeb3Context } from "web3-react";
import Web3Service from "../../util/web3Service";
import DaoAbi from "../../contracts/moloch.json";
import DaoByteCode from "../../contracts/molochByteCode.json";
import { post } from "../../util/requests";
import summonSteps from "./SummonSteps";
import Loading from "../loading/Loading";

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
      {status && <div className="Status">{status.message}</div>}
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
  const [loading, setLoading] = useState(false);
  const [runOnce, setRunOnce] = useState(false);
  const [formError, setformError] = useState("");

  const handleSubmit = async values => {
    console.log(values);

    setLoading(true);

    const web3Service = new Web3Service();

    if(web3Service.toWei(values.deposit.proposalDeposit) < web3Service.toWei(values.deposit.processingReward)){
      setformError("Deposit must be greater than reward.")
      setLoading(false);
      return false;
    }

    try {
      const daoContract = await web3Service.createContract(DaoAbi);

      const deployedContract = await daoContract.deploy({
        data: DaoByteCode.object,
        arguments: [
          context.account,
          values.currency.approvedToken,
          values.timing.periodDuration,
          values.timing.votingPeriodLength,
          values.timing.gracePeriodLength,
          values.timing.abortWindow,
          web3Service.toWei(values.deposit.proposalDeposit),
          values.deposit.dilutionBound,
          web3Service.toWei(values.deposit.processingReward)
        ]
      });

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
          console.log('runOnce', runOnce);
          if(!runOnce){
            setRunOnce(true); // not working
            const newMoloch = {
              summonerAddress: context.account,
              contractAddress: receipt.contractAddress,
              name: values.dao.name,
              minimumTribute: values.currency.minimumTribute,
              description: values.dao.description
            };
  
            post("moloch", newMoloch)
              .then(newMolochRes => {
  
                const application = {
                  name: "Summoner",
                  bio: "Summoner of the Dao",
                  pledge: "0",
                  shares: "1",
                  applicantAddress: context.account,
                  molochContractAddress: receipt.contractAddress,
                  status: "Member"
                };

                console.log("created new moloch", newMolochRes, application);

  
                post(`moloch/apply`, application).then((appRes)=> {
                  console.log("summoner added", appRes);
  
                  props.history.push(`/dao/${receipt.contractAddress}`);
                  setLoading(false);

                }).catch(err => {
                  setLoading(false);
                  console.log("new applicant error", err);
                });
                
                
  
              })
              .catch(err => {
                setLoading(false);
                console.log("moloch creation error", err);
              });
          }

        })
        .on("confirmation", function(confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .then(function(newContractInstance) {
          console.log(newContractInstance.options.address); // instance with the new contract address
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setformError(`Something went wrong. please try again`);
    }
  };

  console.log("loading", loading);

  return (
    <>
      {context.account ? (
        <>
          {!loading ? (
            <>
              {formError && <small style={{ color: "red" }}>{formError}</small>}
              <FormikWizard
                steps={summonSteps}
                onSubmit={handleSubmit}
                render={FormWrapper}
              />
            </>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <p>Connect your metamask account</p>
      )}
    </>
  );
};

export default withRouter(SummonWizard);
