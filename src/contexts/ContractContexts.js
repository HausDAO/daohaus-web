import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from 'web3modal';

import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import { USER_TYPE, w3connect, createWeb3User } from '../components/auth/Auth';

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const TokenContext = createContext();

const ContractContexts = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [token, setToken] = useState();
  const [moloch, setMoloch] = useState();

  useEffect(() => {
    const setUp = async () => {
      let loginType = localStorage.getItem('loginType') || USER_TYPE.READ_ONLY;

      if (Web3Modal.cachedProvider) {
        loginType = USER_TYPE.WEB3;
      }

      try {
        console.log(`Initializing user type: ${loginType || 'read-only'}`);

        switch (loginType) {
          case USER_TYPE.WEB3: {
            if (Web3Modal.cachedProvider) {
              const { Web3Modal: w3c, web3, provider } = await w3connect(
                Web3Modal,
              );
              const [account] = await web3.eth.getAccounts();
              w3c.store = { web3, provider };

              const web3Service = new Web3Service(web3);
              const user = createWeb3User(account);
              setWeb3({web3Service, user});
            } else {
              // read only
              const web3 = new Web3(
                new Web3.providers.HttpProvider(
                  process.env.REACT_APP_INFURA_URI.split('/').pop(),
                ),
              );
              const web3Service = new Web3Service(web3);
              setWeb3({web3Service, user: {}});
            }
            break;
          }
          case USER_TYPE.READ_ONLY:
          default:
            // read only
            const web3 = new Web3(
              new Web3.providers.HttpProvider(
                process.env.REACT_APP_INFURA_URI.split('/').pop(),
              ),
            );
            const web3Service = new Web3Service(web3);
            setWeb3({web3Service, user: {}});
            break;
        }
        // set user
        localStorage.setItem('loginType', loginType);
      } catch (e) {
        console.error(
          `Could not log in with loginType ${loginType}: ${e.toString()}`,
        );

        localStorage.setItem('loginType', '');

        // read only
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            process.env.REACT_APP_INFURA_URI.split('/').pop(),
          ),
        );
        const web3Service = new Web3Service(web3);
        setWeb3({web3Service, user: {}});
      } finally {
        // set dao service
      }
    };
    setUp();
  }, []);
  return (
    <Web3Context.Provider value={[web3, setWeb3]}>
      <MolochContext.Provider value={[moloch, setMoloch]}>
        <TokenContext.Provider value={[token, setToken]}>
          {children}
        </TokenContext.Provider>
      </MolochContext.Provider>
    </Web3Context.Provider>
  );
};

export default ContractContexts;
