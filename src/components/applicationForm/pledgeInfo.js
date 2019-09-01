import { FastField, useFormikContext } from 'formik'
import React, { useState, useEffect } from 'react'
import MolochService from '../../util/molochService';
import { withRouter } from "react-router-dom";

function PledgeInfo(props) {
  const { errors, touched } = useFormikContext();
  const [contractData, setContractData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const molochService = new MolochService(props.match.params.contractAddress);

      const token = await molochService.approvedToken();
      
      setContractData({token})
    };

    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <div className="Step">
      <div>
        <h3>Pledge</h3>
        <div className="Field">
          <label htmlFor="pledge">How much are you pledging?</label>
          <p className="InlineLabel">{contractData.token}</p>
          <FastField name="pledge" id="pledge" />
        </div>
      </div>
      <small style={{ color: 'red' }}>
        {touched.pledge && errors.pledge}
      </small>
    </div>
  )
}

export default withRouter(PledgeInfo)