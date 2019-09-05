import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { FormikWizard } from "formik-wizard";

import { post } from "../../util/requests";
import steps from "./steps";
import { useWeb3Context } from "web3-react";
import WethService from "../../util/wethService";
import MolochService from "../../util/molochService";
import Web3Service from "../../util/web3Service";
import DaiService from "../../util/daiService";
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
    <div>
      {children}
      {status && <div>{status.message}</div>}
      <div className="ButtonGroup">
        <button type="button" onClick={goToPreviousStep} disabled={!canGoBack}>
          Previous
        </button>
        <button type="submit">
          {actionLabel || (isLastStep ? "Pledge" : "Next step")}
        </button>
      </div>
    </div>
  );
}

const ApplicationWizard = props => {
  const { contractAddress, history } = props;
  const [loading, setLoading] = useState(false);
  const [formError, setformError] = useState("");

  const context = useWeb3Context();
  const web3Service = new Web3Service();
  const wethService = new WethService();
  const daiService = new DaiService();
  const molochService = new MolochService(contractAddress);
  let currency = "";
  const handleSubmit = async values => {
    setLoading(true);

    try {
      const daoToken = await molochService.approvedToken();
      if (daoToken === "Weth") {
        currency = await wethService.initContract();
      } else {
        currency = await daiService.initContract();
      }

      const application = {
        name: values.personal.name,
        bio: values.personal.bio,
        pledge: values.pledge.pledge,
        shares: values.shares.shares,
        applicantAddress: context.account,
        molochContractAddress: contractAddress,
        status: "new"
      };

      const res = await post(`moloch/apply`, application);

      if (res.data.error) {
        return {
          message: res.data.error
        };
      } else {
        return {
          message: "thanks for signaling, appoving tokens now"
        };

      await currency.methods
        .approve(contractAddress, web3Service.toWei(values.pledge.pledge))
        .send({ from: context.account })
        .once("transactionHash", txHash => {})
        .on("receipt", async receipt => {
          console.log(receipt);

          setLoading(false);
          history.push(`/dao/${contractAddress}`);

          }
        })
        .then(resp => {
          return resp;
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          setformError(`Something went wrong. please try again`);

          return { error: "rejected transaction" };
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setformError(`Something went wrong. please try again`);
      return { error: "rejected transaction" };
    }
  };

  return (
    <div className="Wizard">
      {context.account ? (
        <>
          {!loading ? (
            <>
              {formError && <p>{formError}</p>}
              <FormikWizard
                steps={steps}
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
    </div>
  );
};

export default withRouter(ApplicationWizard);
