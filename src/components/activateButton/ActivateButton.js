

import React from "react";
import { useWeb3Context } from 'web3-react'

const ActivateButton = () => {

    const context = useWeb3Context()

    const activate = () => context.setFirstValidConnector(['MetaMask', 'Infura'])
  
    if (!context.active && !context.error) {
      // loading
      return (<button onClick={() => activate()}>
      Activate
      </button>)
    } else if (context.error) {
      //error
      return (<button onClick={() => activate()}>
      Activate Error
      </button>)
    } else {
      // success
      return (<button onClick={() => activate()}>
      Activated
      </button>)
    }


};

export default ActivateButton;