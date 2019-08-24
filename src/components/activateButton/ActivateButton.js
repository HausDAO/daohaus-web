

import React from "react";
import { useWeb3Context } from 'web3-react'

const ActivateButton = () => {

    const context = useWeb3Context()

    const activate = async () => {
        await context.setFirstValidConnector(['MetaMask'])
        console.log(context); 

    }
  
    if (!context.active && !context.error) {
      // loading
      return (<button onClick={() => activate()}>
      Activate
      </button>)
    } else if (context.error) {
      //error
      return (
      <>
      <button onClick={() => activate()}>
      Activate
      </button> 
     
          {context.error.code === 'UNSUPPORTED_NETWORK' &&  <p className="ErrorText">Unsupported network: please use mainnet</p>}
      </>
      )
    } else {
      // success
      return ( <>
          <button onClick={() => activate()}>
      Activated
      </button>
      <p>{context.account}</p>
      </>)
    
    }


};

export default ActivateButton;