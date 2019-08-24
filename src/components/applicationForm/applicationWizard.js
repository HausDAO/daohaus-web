import React from "react";
import { FormikWizard } from "formik-wizard";

import { post } from "../../util/requests";
import steps from "./steps";
import { useWeb3Context } from "web3-react";
import WethService from "../../util/wethService";
import MolochService from "../../util/molochService";

function FormWrapper({
  children,
  isLastStep,
  status,
  goToPreviousStep,
  canGoBack,
  actionLabel
}) {
  return (
    <div>
      {children}
      {status && (
        <div>
          {status.message}
          <hr />
        </div>
      )}
      <div>
        <button type="button" onClick={goToPreviousStep} disabled={!canGoBack}>
          Previous
        </button>
        <button type="submit">
          {actionLabel || (isLastStep ? "Pledge" : "Next step")}
        </button>
      </div>
      <hr />
    </div>
  );
}

const ApplicationWizard = props => {
  const { contractAddress } = props;
  const context = useWeb3Context();
  const web3Service = new Web3Service();
  const wethService = new WethService();
  const molochService = new MolochService(contractAddress);
  let currency = '';
  const handleSubmit = async values => {
    try {
      if(molochService.approvedToken() === "Weth"){
        await wethService.initContract();
        currency = wethService.contract;
      } else {
        await daiService.initContract();
        currency = wethService.contract;
      }

      const approve = await currency
        .approve(
          context.account,
          contractAddress,
          web3Service.toWei(values.amount)
        )
        .send({ from: context.account })
        .once("transactionHash", txHash => {})
        .then(resp => {
          return resp;
        })
        .catch(err => {
          console.log(err);
          return { error: "rejected transaction" };
          return false;
        });
    } catch (err) {
      console.log(err);
      alert(`Something went wrong. please try again`);
      return false;
    }

    const application = {
      name: values.personal.name,
      bio: values.personal.bio,
      pledge: values.pledge.pledge,
      shares: values.shares.shares,
      applicantAddress: context.account,
      molochContractAddress: contractAddress
    };

    const res = await post(`moloch/apply`, application);

    if (res.data.error) {
      return {
        message: res.data.error
      };
    } else {
      return {
        message: "thanks for signaling"
      };
    }
  };

  return (
    <>
      {context.account ? (
        <FormikWizard
          steps={steps}
          onSubmit={handleSubmit}
          render={FormWrapper}
        />
      ) : (
        <p>Connect your metamask account</p>
      )}
    </>
  );
};

export default ApplicationWizard;
