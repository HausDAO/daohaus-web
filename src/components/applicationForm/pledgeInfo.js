import { FastField, useFormikContext } from 'formik'
import React, { useState, useEffect } from 'react'
import MolochService from '../../util/molochService';

function PledgeInfo() {
  const { errors, touched } = useFormikContext();
  const [contractData, setContractData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const molochService = new MolochService('0x0372f3696fa7dc99801f435fd6737e57818239f2');

      const token = await molochService.approvedToken();
      setContractData({token})
    };

    fetchData();
  }, []);

  return (
    <div className="Step">
      <div>
        <h3>Pledge</h3>
        <label htmlFor="pledge">How much are you pledging?</label>
        <p>{contractData.token}</p>
        <FastField name="pledge" id="pledge" />
      </div>
      <small style={{ color: 'red' }}>
        {touched.pledge && errors.pledge}
      </small>
    </div>
  )
}

export default PledgeInfo