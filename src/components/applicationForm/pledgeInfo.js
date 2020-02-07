import { FastField, useFormikContext } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import { TokenContext } from '../../contexts/ContractContexts';

import { withRouter } from 'react-router-dom';

function PledgeInfo() {
  const { errors, touched } = useFormikContext();
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
    <div className="Step">
      <div>
        <h3>Pledge</h3>
        <div className="Field">
          <label htmlFor="pledge">How much are you pledging?</label>
          <p className="InlineLabel">{contractData.tokenSymbol}</p>
          <FastField name="pledge" id="pledge" />
        </div>
      </div>
      <small style={{ color: 'red' }}>{touched.pledge && errors.pledge}</small>
      <div>
        <label htmlFor="shares">How many shares are you requesting?</label>
        <p>Typically 1 share is equal to 1 tribute currency</p>
        <FastField name="shares" id="shares" />
      </div>
      <small style={{ color: 'red' }}>{touched.shares && errors.shares}</small>
    </div>
  );
}

export default withRouter(PledgeInfo);
