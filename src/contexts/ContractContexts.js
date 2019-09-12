import React, { useState, useEffect, createContext } from "react";

import WethService from "../util/wethService";
import DaiService from "../util/daiService";

export const MolochContext = createContext(null);
export const WethContext = createContext();
export const DaiContext = createContext();

const ContractContexts = ({ children }) => {
  const [moloch, setMoloch] = useState();
  const [weth, setWeth] = useState();
  const [dai, setDai] = useState();

  useEffect(() => {
    const wethService = new WethService();
    const daiService = new DaiService();
    setWeth(wethService);
    setDai(daiService);
  }, []);
  return (
    <MolochContext.Provider value={[moloch, setMoloch]}>
      <DaiContext.Provider value={[dai, setDai]}>
        <WethContext.Provider value={[weth, setWeth]}>
          {children}
        </WethContext.Provider>
      </DaiContext.Provider>
    </MolochContext.Provider>
  );
};

export default ContractContexts;
