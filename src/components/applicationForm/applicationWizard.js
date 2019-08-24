import React from 'react'
import { FormikWizard } from 'formik-wizard'

import { post } from '../../util/requests';
import steps from './steps'
import { useWeb3Context } from 'web3-react';



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
          {actionLabel || (isLastStep ? 'Pledge' : 'Next step')}
        </button>
      </div>
      <hr />
    </div>
  )
}

const ApplicationWizard = (props) => {
  const { contractAddress } = props;
  const context = useWeb3Context();

  const handleSubmit = async (values) => {
      const application = {
        name: values.personal.name,
        bio: values.personal.bio,
        pledge: values.pledge.pledge,
        shares: values.shares.shares,
        applicantAddress: context.account,
        molochContractAddress: contractAddress
      }

      const res = await post(`moloch/apply`, application);

      if (res.data.error) {
        return {
          message: res.data.error,
        }
      } else {
        return {
          message: 'thanks for signaling'
        }
      }
  };

  return (
    <>
    {context.account ? (
      <FormikWizard steps={steps} onSubmit={handleSubmit} render={FormWrapper} />
    ) : (
      <p>Connect your metamask account</p>
    )}
    </>
  )
}

export default ApplicationWizard