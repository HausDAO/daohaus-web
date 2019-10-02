import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { FormikWizard } from 'formik-wizard';

import { post } from '../../util/requests';
import steps from './steps';
import { useWeb3Context } from 'web3-react';
import Loading from '../loading/Loading';

import {
  WethContext,
  DaiContext,
  Web3Context,
} from '../../contexts/ContractContexts';
import { addressToToken } from '../../util/constants';

function FormWrapper({
  children,
  isLastStep,
  status,
  goToPreviousStep,
  canGoBack,
  actionLabel,
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
          {actionLabel || (isLastStep ? 'Pledge' : 'Next step')}
        </button>
      </div>
    </div>
  );
}

const ApplicationWizard = props => {
  const { contractAddress, contract, history } = props;
  const [loading, setLoading] = useState(false);
  const [formError, setformError] = useState('');

  const context = useWeb3Context();
  const [web3Service] = useContext(Web3Context);
  const [wethService] = useContext(WethContext);
  const [daiService] = useContext(DaiContext);

  let currency = '';
  const handleSubmit = async values => {
    setLoading(true);

    try {
      console.log('contract', contract);

      const daoToken = await contract.methods.approvedToken().call();
      if (addressToToken[daoToken] === 'Weth') {
        currency = wethService;
      } else {
        currency = daiService;
      }

      const application = {
        name: values.personal.name,
        bio: values.personal.bio,
        pledge: values.pledge.pledge,
        shares: values.shares.shares,
        applicantAddress: context.account,
        molochContractAddress: contractAddress,
        status: 'new',
      };

      await currency.contract.methods
        .approve(contractAddress, web3Service.toWei(values.pledge.pledge))
        .send({ from: context.account })
        .once('transactionHash', txHash => {
          post(`moloch/apply`, application).then(()=>{
            console.log({
              message: 'thanks for signaling, appoving tokens now',
            });
          }).catch((err) => {
            console.log({
              message: err,
            });
          });

        })
        .on('receipt', async receipt => {
          console.log(receipt);

          setLoading(false);
          history.push(`/dao/${contractAddress}`);
        })
        .then(resp => {
          return resp;
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          setformError(`Something went wrong. please try again`);

          return { error: 'rejected transaction' };
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setformError(`Something went wrong. please try again`);
      return { error: 'rejected transaction' };
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
