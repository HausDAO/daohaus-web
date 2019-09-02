import { useFormikWizard } from 'formik-wizard'
import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import MolochService from '../../util/molochService';

function Summary() {
  const { values } = useFormikWizard();
  const [contractData, setContractData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const molochService = new MolochService(props.match.params.contractAddress);
      const token = await molochService.approvedToken();
      setContractData({token})
    };

    fetchData();
  }, []);

  return (
    <div className="Step Summary">
      <h3>Pledge to the DAO!</h3>
      <p className="Label">Name</p><p className="Value Data">{values.personal.name}</p>
      <p className="Label">Bio</p><p className="Value Data">{values.personal.bio}</p>
      <p className="Value">You are pledging {values.pledge.pledge} {contractData.token} in tribute
      and requesting {values.shares.shares} shares</p>
      <p></p>
    </div>
  )
}

export default withRouter(Summary)