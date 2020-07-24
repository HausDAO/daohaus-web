import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { getChainData } from './chains';

export const USER_TYPE = {
  WEB3: 'web3',
  READ_ONLY: 'readonly',
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_URI.split('/').pop(),
    },
  },
};

export const w3connect = async web3Modal => {
  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);

  const injectedChainId = await web3.eth.getChainId();

  if (injectedChainId !== +process.env.REACT_APP_NETWORK_ID) {
    alert(
      `Please switch Web3 to the correct network and try signing in again. Detected network: ${
        getChainData(injectedChainId).network
      }, Required network: ${
        getChainData(+process.env.REACT_APP_NETWORK_ID).network
      }`,
    );
    throw new Error(
      `Injected web3 chainId: ${injectedChainId}, process.env: ${process.env.REACT_APP_NETWORK_ID}`,
    );
  }

  return { web3Modal, web3 };
};
