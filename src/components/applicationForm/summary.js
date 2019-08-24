import { useFormikWizard } from 'formik-wizard'
import React, { useState, useEffect } from 'react'
import MolochService from '../../util/molochService';

function Summary() {
  const { values } = useFormikWizard();
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
    <div>
      <p>Is this information correct?</p>
      <p>You are pledging {values.pledge.pledge} {contractData.token} in tribute</p>
      <p>Name: {values.personal.name}</p>
      <p>Bio: {values.personal.bio}</p>
    </div>
  )
}

export default Summary