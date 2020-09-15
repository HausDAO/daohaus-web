export const supportedChains = {
  1: {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/',
    api_url: 'https://luizh7qidl.execute-api.us-east-1.amazonaws.com/prod',
    pokemol_url: 'https://pokemol.com',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus',
    stats_subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats',
    factory_contract: '0x2840d12d926cc686217bb42B80b662C7D72ee787',
    factory_v2_contract: '0x1782a13f176e84Be200842Ade79daAA0B09F0418',
    dai_contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
    weth_contract: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  4: {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/',
    api_url: 'https://e5sk5e8me2.execute-api.us-east-1.amazonaws.com/rinkeby',
    pokemol_url: 'https://rinkeby.pokemol.com',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby',
    stats_subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-rinkeby',
    factory_contract: '0x610247467d0dfA8B477ad7Dd1644e86CB2a79F8F',
    factory_v2_contract: '0x763b61A62EF076ad960E1d513713B2aeD7C1b88e',
    dai_contract: '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658',
    weth_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  42: {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/',
    api_url: 'https://kp7w1od8kd.execute-api.us-east-1.amazonaws.com/kovan',
    pokemol_url: 'https://kovan.pokemol.com',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-kovan',
    stats_subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-kovan',
    factory_contract: '0x0C60Cd59f42093c7489BA68BAA4d7A01f2468153',
    factory_v2_contract: '0xB47778d3BcCBf5e39dEC075CA5F185fc20567b1e',
    dai_contract: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
    weth_contract: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  },
  100: {
    name: 'xDAI Chain',
    short_name: 'xdai',
    chain: 'xDAI',
    network: 'xdai',
    chain_id: 100,
    network_id: 100,
    rpc_url: 'https://dai.poa.network',
    api_url: 'https://fbpzfkbqyi.execute-api.us-east-1.amazonaws.com/xdai',
    pokemol_url: 'https://xdai.pokemol.com',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
    stats_subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-xdai',
    factory_contract: '0x9232DeA84E91b49feF6b604EEA0455692FC27Ba8',
    factory_v2_contract: '0x124F707B3675b5fdd6208F4483C5B6a0B9bAf316',
    wxdai_contract: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  },
  74: {
    name: 'ID Chain',
    short_name: 'idchain',
    chain: 'ID Chain',
    network: 'idchain',
    chain_id: 74,
    network_id: 74,
    rpc_url: process.env.REACT_APP_RPC_URL,
    api_url: 'https://vncmvrainc.execute-api.us-east-1.amazonaws.com/idchain',
    pokemol_url: 'https://idchain.pokemol.com',
    subgraph_url: process.env.REACT_APP_SUBGRAPH_URL,
    stats_subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-xdai',
    factory_contract: '0xb29f7eEc3d6d3B614fd458094f7e2Ebb3488E12D',
    factory_v2_contract: '0xF42aFC058B7b6f80729e43021404549F69875652',
    weidi_contract: '0x5B160edBa6119828c5B065804e86111921323f9c',
  },
};

export function getChainData(chainId) {
  const chainData = supportedChains[+chainId];

  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = process.env.REACT_APP_INFURA_PROJECT_ID;

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export default supportedChains;
