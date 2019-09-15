import { useFormikWizard } from 'formik-wizard'
import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from "react-router-dom";


import { Web3Context, MolochContext  } from "../../contexts/ContractContexts";
import { addressToToken } from '../../util/constants';


function Summary(props) {
  const { values } = useFormikWizard();
  const [contractData, setContractData] = useState({});
  const [molochContext] = useContext(MolochContext);

  useEffect(() => {
    const fetchData = async () => {
      
        const token = await molochContext.methods.approvedToken().call();
        const tokenSymbol = addressToToken[token];
        setContractData({tokenSymbol})
    };

    fetchData();
  }, [props.match.params.contractAddress]);

  return (
    <div className="Step Summary">
      <h3>Pledge to the DAO!</h3>
      <p className="Label">Name</p><p className="Value Data">{values.personal.name}</p>
      <p className="Label">Bio</p><p className="Value Data">{values.personal.bio}</p>
      <p className="Value">You are pledging {values.pledge.pledge} {contractData.token} in tribute
      and requesting {values.shares.shares} shares</p>
      <p>After pledging a sponsoring member can now make a proposal for your application. You have not been accepted yet and have 
        only approved the DAO to hold your funds during the proposal period. You must have these funds available in your wallet for a proposal to begin..</p>
    </div>
  )
}

export default withRouter(Summary)