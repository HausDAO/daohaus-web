import React, { useState, useEffect, createContext } from "react";

import Web3 from "web3";

import WethService from "../util/wethService";
import DaiService from "../util/daiService";
import Web3Service from "../util/web3Service";

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const WethContext = createContext();
export const DaiContext = createContext();

const ContractContexts = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [weth, setWeth] = useState();
  const [dai, setDai] = useState();
  const [moloch, setMoloch] = useState();

  useEffect(() => {
    const setUp = async () => {
      let _web3;
      if (Web3.givenProvider && Web3.givenProvider.networkVersion === '1') {
        console.log('reg web3',Web3.givenProvider);
        
        _web3 = new Web3(Web3.givenProvider);
        // if(_web3.eth.givenProvider){
        //   _web3 = new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI)
          
        // }
        console.log(_web3);
        
      } else {
        console.log('net web3');
        _web3 = new Web3(
          new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URI)
        );
      }
      const web3Service = new Web3Service(_web3);
      console.log('web3service', web3Service);
      setWeb3(web3Service);
      
      const wethService = new WethService(web3Service);
      const daiService = new DaiService(web3Service);
      setWeth(wethService);
      setDai(daiService);
    }
    setUp();
  }, []);
  return (
    <Web3Context.Provider value={[web3, setWeb3]}>
      <MolochContext.Provider value={[moloch, setMoloch]}>
        <DaiContext.Provider value={[dai, setDai]}>
          <WethContext.Provider value={[weth, setWeth]}>
            {children}
          </WethContext.Provider>
        </DaiContext.Provider>
        </MolochContext.Provider>
    </Web3Context.Provider>
  );
};

export default ContractContexts;
