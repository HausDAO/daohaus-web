import React, { useState, useEffect, createContext } from 'react';
import Web3Modal from 'web3modal';

import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import { USER_TYPE, w3connect, providerOptions } from '../components/auth/Auth';
import { getChainData } from '../components/auth/chains';

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const TokenContext = createContext();

const ContractContexts = ({ children }) => {
  const [w3Context, setW3Context] = useState();
  const [token, setToken] = useState();
  const [moloch, setMoloch] = useState();

  useEffect(() => {
    const setUp = async () => {
      const web3Modal = new Web3Modal({
        network: getChainData(+process.env.REACT_APP_NETWORK_ID).network, // optional
        providerOptions, // required
        cacheProvider: true,
      });
      let loginType = localStorage.getItem('loginType') || USER_TYPE.READ_ONLY;

      if (web3Modal.cachedProvider) {
        loginType = USER_TYPE.WEB3;
      }

      try {
        console.log(`Initializing user type: ${loginType || 'read-only'}`);

        switch (loginType) {
          case USER_TYPE.WEB3: {
            if (web3Modal.cachedProvider) {
              console.log('cached provider');
              
              const w3m = await w3connect(
                web3Modal,
              );
              console.log('web3 modal', w3m);
              
              const [user] = await w3m.web3.eth.getAccounts();

              const web3Service = new Web3Service(w3m.web3);
              setW3Context({web3Service, user});
            } else {
              // read only
              const web3 = new Web3(
                new Web3.providers.HttpProvider(
                  process.env.REACT_APP_INFURA_URI.split('/').pop(),
                ),
              );
              const web3Service = new Web3Service(web3);
              setW3Context({web3Service, user: ""});
              
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
            setW3Context({web3Service, user: ""});
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
        setW3Context({web3Service, user: ""});
      } finally {
        // set dao service
      }
    };
    setUp();
  }, []);
  return (
    <Web3Context.Provider value={[w3Context, setW3Context]}>
      <MolochContext.Provider value={[moloch, setMoloch]}>
        <TokenContext.Provider value={[token, setToken]}>
          {children}
        </TokenContext.Provider>
      </MolochContext.Provider>
    </Web3Context.Provider>
  );
};

export default ContractContexts;
