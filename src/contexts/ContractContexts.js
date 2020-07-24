import React, { useState, useEffect, createContext, useContext } from 'react';
import Web3Modal from 'web3modal';

import Web3 from 'web3';

import Web3Service from '../util/web3Service';
import { USER_TYPE, w3connect, providerOptions } from '../util/auth';
import { getChainData } from '../util/chains';
import SummonService from '../util/summon-service';
import { SummonContext } from './SummonContext';

export const MolochContext = createContext(null);
export const Web3Context = createContext();
export const TokenContext = createContext();

const ContractContexts = ({ children }) => {
  const [w3Context, setW3Context] = useState();
  const [token, setToken] = useState();
  const [moloch, setMoloch] = useState();
  const { dispatch } = useContext(SummonContext);

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
        console.log(`Initializing account type: ${loginType || 'read-only'}`);

        switch (loginType) {
          case USER_TYPE.WEB3: {
            if (web3Modal.cachedProvider) {
              const w3m = await w3connect(web3Modal);

              const [account] = await w3m.web3.eth.getAccounts();

              const web3Service = new Web3Service(w3m.web3);
              setW3Context({ web3Service, account });
            } else {
              // read only
              const web3 = new Web3(
                new Web3.providers.HttpProvider(
                  process.env.REACT_APP_INFURA_URI.split('/').pop(),
                ),
              );
              const web3Service = new Web3Service(web3);
              setW3Context({ web3Service, account: '' });
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
            setW3Context({ web3Service, account: '' });
            break;
        }
        // set account
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
        setW3Context({ web3Service, account: '' });
      } finally {
        // set dao service
      }
    };
    setUp();
  }, []);

  useEffect(() => {
    if (w3Context && w3Context.web3Service) {
      const summonService = new SummonService(w3Context.web3Service);
      dispatch({ type: 'setService', payload: summonService });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w3Context]);

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
