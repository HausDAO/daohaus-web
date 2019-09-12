import React, { useState, useEffect, createContext } from "react";

export const MolochContext = createContext();

const contractContexts = ({ children }) => {
  return (
    <MolochContext.Provider value={[moloch, setMoloch]}>
      {children}
    </MolochContext.Provider>
  );
};
