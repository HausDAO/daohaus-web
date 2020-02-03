import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { FormikWizard } from 'formik-wizard';

import { post } from '../../util/requests';
import { getSteps } from './steps';
import { useWeb3Context } from 'web3-react';
import Loading from '../loading/Loading';

import {
  Web3Context,
  TokenContext,
  MolochContext,
} from '../../contexts/ContractContexts';

import TokenService from '../../util/tokenService';
import MolochService from '../../util/molochService';

import { useApolloClient } from 'react-apollo';
import { GET_MOLOCH } from '../../util/queries';

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
        {canGoBack ? (
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={!canGoBack}
          >
            Previous
          </button>
        ) : (
          <div> </div>
        )}

        <button type="submit">
          {actionLabel || (isLastStep ? 'Pledge' : 'Next step')}
        </button>
      </div>
    </div>
  );
}

const ApplicationWizard = props => {
  const { contractAddress, history } = props;
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [txHash, settxHash] = useState('');
  const [formError, setformError] = useState('');
  const [daoData, setDaoData] = useState({});

  const context = useWeb3Context();
  const [web3Service] = useContext(Web3Context);
  const [tokenService, setTokenService] = useContext(TokenContext);
  const [, setMolochService] = useContext(MolochContext);

  useEffect(() => {
    getDao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Service]);

  const getDao = async () => {
    const { isLoading, isError, data } = await client.query({
      query: GET_MOLOCH,
      variables: { contractAddr: contractAddress },
    });

    isLoading && setLoading(isLoading);
    isError && setError(isError);

    if (data && web3Service) {
      const molochService = new MolochService(contractAddress, web3Service);
      await molochService.initContract();

      const tokenService = new TokenService(
        data.factories[0].tokenInfo.address,
        web3Service,
      );
      await tokenService.initContract();

      setDaoData(data.factories[0]);
      setTokenService(tokenService);
      setMolochService(molochService);
    }
  };

  const handleSubmit = async values => {
    setLoading(true);

    try {
      const application = {
        pledge: values.pledge.pledge,
        shares: values.pledge.shares,
        applicantAddress: context.account,
        molochContractAddress: contractAddress,
        status: 'new',
      };

      await tokenService.contract.methods
        .approve(contractAddress, web3Service.toWei(values.pledge.pledge))
        .send({ from: context.account })
        .once('transactionHash', _txHash => {
          settxHash(_txHash);
          post(`moloch/apply`, application)
            .then(() => {
              console.log({
                message: 'thanks for signaling, approving tokens now',
              });
            })
            .catch(err => {
              console.log({
                message: err,
              });
            });
        })
        .on('receipt', async receipt => {
          console.log('receipt', receipt);

          setLoading(false);
          history.push(`/dao/${contractAddress}?successMessage=pledge`);
        })
        .then(resp => {
          return resp;
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          if (err.code === 4001) {
            setformError(`Approval rejected by user. Please try again.`);
            return { error: err };
          }

          if (
            err.message.indexOf(
              'Error: Transaction was not mined within 50 blocks',
            ) > -1
          ) {
            setformError(
              `Rejected transaction is taking a long time. TX hash: ${txHash}`,
            );
            return { error: err };
          }

          setformError(`Something went wrong. Please try again.`);

          return { error: 'Rejected transaction is taking a long time. ' };
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      setformError(`Something went wrong. please try again`);
      return { error: 'rejected transaction' };
    }
  };

  return (
    <div className="Wizard SmallContainer">
      {context.account ? (
        <>
          {!loading && daoData.apiData ? (
            <>
              {formError && <small style={{ color: 'red' }}>{formError}</small>}
              <FormikWizard
                steps={getSteps(daoData.apiData.isEuma)}
                onSubmit={handleSubmit}
                render={FormWrapper}
              />
            </>
          ) : (
            <Loading msg={'Pledging'} txHash={txHash} />
          )}
        </>
      ) : (
        <p>Connect your metamask account</p>
      )}
    </div>
  );
};

export default withRouter(ApplicationWizard);
