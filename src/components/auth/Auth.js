import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { getChainData } from './chains';


export const USER_TYPE = {
    WEB3: 'web3',
    READ_ONLY: 'readonly',
  };

const getChainIdName = chainId => {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 42:
      return 'Kovan';
    case 4447:
      return 'Ganache';
    default:
      return 'Unknown';
  }
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_URI.split('/').pop(),
    },
  },
};

export const createWeb3User = accountAddress => {
  return {
    type: USER_TYPE.WEB3,
    username: accountAddress,
  };
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
  
  return { web3Modal, web3, provider };
};

export const signInWithWeb3 = async () => {
  // const infuraId = process.env.REACT_APP_INFURA_URI.split('/').pop();

  console.log(
    'process.env.REACT_APP_NETWORK_ID: ',
    process.env.REACT_APP_NETWORK_ID,
  );
  const web3Modal = new Web3Modal({
    network: getChainData(+process.env.REACT_APP_NETWORK_ID).network, // optional
    providerOptions, // required
  });
  console.log('web3Modal: ', web3Modal);

  const provider = await web3Modal.connect();
  console.log('provider: ', provider);

  const web3 = new Web3(provider);
  console.log('web3: ', web3);

  const injectedChainId = await web3.eth.getChainId();
  console.log('injectedChainId: ', injectedChainId);

  const [account] = await web3.eth.getAccounts();
  console.log('account: ', account);
  console.log('injectedChainId !== +process.env.REACT_APP_NETWORK_ID', injectedChainId !== +process.env.REACT_APP_NETWORK_ID);
  

  if (injectedChainId !== +process.env.REACT_APP_NETWORK_ID) {
    alert(
      `Please switch Web3 to the correct network and try signing in again. Detected network: ${getChainIdName(
        injectedChainId,
      )}, Required network: ${getChainIdName(
        +process.env.REACT_APP_NETWORK_ID,
      )}`,
    );
    throw new Error(
      `Injected web3 chainId: ${injectedChainId}, process.env: ${+process.env.REACT_APP_NETWORK_ID}`,
    );
  }

  return { user: createWeb3User(account), provider };
};
