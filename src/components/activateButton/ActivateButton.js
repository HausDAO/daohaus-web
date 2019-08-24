

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
      return (<button className="AuthButton" onClick={() => activate()}>
      Sign in with Ethereum
      </button>)
    } else if (context.error) {
      //error
      return (
      <>
      <button onClick={() => activate()}>
      Sign in with Ethereum
      </button> 
     
          {context.error.code === 'UNSUPPORTED_NETWORK' &&  <p className="ErrorText">Unsupported network: please use mainnet</p>}
      </>
      )
    } else {
      // success
      return ( <>
        <button onClick={() => activate()}>
          <span className="Data">{context.account}</span>
        </button>
      </>)
    
    }


};

export default ActivateButton;