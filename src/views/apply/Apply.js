import React, {useContext, useEffect, useState} from "react";
import ApplicationWizard from "../../components/applicationForm/applicationWizard";
import DaoAbi from "../../contracts/moloch";
import { Web3Context } from "../../contexts/ContractContexts";

const Apply = (props) => {
  const [contract, setContract] = useState()
  const [web3Service] = useContext(Web3Context);

  useEffect(() => {
    const setUp = async () => {
      if(web3Service){
        const _contract = await web3Service.initContract(
          DaoAbi,
          props.match.params.contractAddress
        );
        setContract(_contract);
      }

    }
    setUp();
  })

  return (
    <div className="View">
      <ApplicationWizard contractAddress={props.match.params.contractAddress} contract={contract}></ApplicationWizard>
    </div>
  );
};

export default Apply;
