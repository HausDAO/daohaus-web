import { useFormikWizard } from 'formik-wizard';
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { TokenContext } from '../../contexts/ContractContexts';

function Summary(props) {
  const { values } = useFormikWizard();
  const [contractData, setContractData] = useState({});
  const [tokenContext] = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      const tokenSymbol = await tokenContext.getSymbol();
      setContractData({ tokenSymbol });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Step Summary">
      <h3>Pledge to the DAO!</h3>
      <p className="Value">
        You are pledging {values.pledge.pledge} {contractData.token} in Tribute
        and requesting {values.pledge.shares} Shares
      </p>
      <p>
        After pledging, a sponsoring member can now make a proposal for your
        application. You have not been accepted yet and have only approved the
        DAO to hold your funds during the proposal period. You must have these
        funds available in your wallet for a proposal to begin..
      </p>
    </div>
  );
}

export default withRouter(Summary);
