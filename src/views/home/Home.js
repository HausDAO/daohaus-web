import React, {useEffect} from "react";
import { useWeb3Context } from 'web3-react'

const Home = () => {

    const context = useWeb3Context()

    useEffect(() => {
      context.setFirstValidConnector(['MetaMask', 'Infura'])
    }, [])
  
    if (!context.active && !context.error) {
      // loading
      return <h1>DAUHAUS</h1>
    } else if (context.error) {
      //error
      return <h1>DAUHAUS ERROR</h1>
    } else {
      // success
      return <h1>DAUHAUS Success</h1>
    }


};

export default Home;
